<template>
  <div
    v-if="step === 2"
    class="cropper"
  >
    <v-progress-circular
      v-if="!isCropperShown"
      indeterminate
      color="primary"
      class="cropper__spinner"
    />
    <div :class="['cropper__content', {'hidden': !isCropperShown}]">
      <input
        ref="fileInput"
        class="cropper__content__input"
        type="file"
        style="display: none"
        name="image"
        accept="image/*"
        @change="setImage"
      >
      <vue-cropper
        ref="cropper"
        class="cropper__content__cropbox"
        :cropmove="cropImage"
        :zoom="cropImage"
        :ready="onReadyHandler"
        :guides="false"
        :view-mode="2"
        drag-mode="crop"
        :auto-crop-area="1"
        :background="false"
        :rotatable="false"
        :src="imgSrc"
        alt="Avatar Image"
      />
      <div class="cropper__content__section">
        <v-btn
          class="cropper__content__section__button"
          depressed
          @click="$refs.fileInput.click()"
        >
          <v-icon class="cropper__content__section__button__icon">
            cloud_upload
          </v-icon>Upload
        </v-btn>
        <img
          class="cropper__content__section__preview"
          :src="croppedImage"
          alt="Cropped Image"
        >
      </div>
      <div class="cropper__content__error-messages">
        {{ error }}
      </div>
      <div class="cropper__content__buttons">
        <v-btn
          class="cropper__content__buttons__button cropper__content__buttons__button--skip"
          depressed
          @click="goToNextStep"
        >
          Skip
        </v-btn>
        <v-btn
          :loading="isLoading"
          class="cropper__content__buttons__button"
          depressed
          color="success"
          @click="saveAvatar"
        >
          Save
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import Avatar from '@/assets/defaultAvatar.png';

export default {
  components: {
    VueCropper
  },
  props: {
    // step is used to load content only when
    // step is equal to 2 (cropper rendering problem)
    step: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      imgSrc: Avatar,
      croppedImage: '',
      maxFileSize: 1048576, // bytes
      localError: null,
      wasImageUploaded: false,
      isCropperShown: false
    };
  },
  computed: {
    error() {
      return this.$store.state.signup.errors.error || this.localError;
    },
    isLoading() {
      return this.$store.state.signup.isLoading;
    }
  },
  methods: {
    onReadyHandler() {
      this.isCropperShown = true;
      this.cropImage();
    },
    setImage(e) {
      this.$store.dispatch('signup/clearErrors');
      const file = e.target.files[0];
      if (!file.type.includes('image/')) {
        this.localError = 'Please select an image file';
        return;
      }
      if (file.size >= this.maxFileSize) {
        this.localError = `File is too large. Max size: ${(
          this.maxFileSize
          / (1024 * 1024)
        ).toPrecision(1)} MB`;
        return;
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const imgSrc = await this.resizeImage(event.target.result, file.type);
          this.imgSrc = imgSrc;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(imgSrc);
        };
        reader.readAsDataURL(file);
        this.localError = null;
        this.wasImageUploaded = true;
      } else {
        this.localError = 'Sorry, FileReader API not supported';
      }
    },
    cropImage() {
      // length check is needed if crop box is too small
      this.croppedImage = this.$refs.cropper.getCroppedCanvas().toDataURL().length < 7
        ? Avatar
        : this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    getAvatarBlob() {
      return new Promise((resolve) => {
        this.$refs.cropper.getCroppedCanvas().toBlob(
          (blob) => {
            resolve(blob);
          },
          'image/jpeg',
          0.1
        );
      });
    },
    async saveAvatar() {
      if (!this.wasImageUploaded) {
        this.localError = 'Upload an avatar';
        return;
      }
      if (!this.error) {
        await this.$store.dispatch(
          'signup/saveAvatar',
          await this.getAvatarBlob()
        );
        if (!this.error) {
          this.goToNextStep();
        }
      }
    },
    goToNextStep() {
      this.$store.dispatch('UI/setCurrentSignUpStep', 3);
    },
    async resizeImage(image, fileType) {
      const createImage = () => new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = image;
      });
      const img = await createImage();

      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const MAX_WIDTH = 400;
      const MAX_HEIGHT = 400;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const dataurl = canvas.toDataURL(fileType);
      return dataurl;
    }
  }
};
</script>

<style lang="scss" scoped>
.hidden {
  opacity: 0;
}
.cropper {
  display: flex;
  flex-grow: 1;
  position: relative;
  &__spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    &__cropbox {
      height: 160px;
      width: calc(100% - 40px);
      margin: 20px 0px 0px;
      // center image before cropperjs init
      text-align: center;
      /deep/ img {
        max-height: 100%;
      }
      /deep/ .cropper-line {
        background-color: transparent;
      }
      /deep/ .cropper-view-box {
        outline-color: $color-blue-medium;
      }
      /deep/ .cropper-point {
        background-color: $color-blue-medium;
        border-radius: 50px;
        height: 5px;
        width: 5px;
      }
      /deep/ .cropper-modal {
        background-color: $color-purple-ultra-dark;
      }
    }
    &__section {
      width: 100%;
      padding: 20px;
      padding-bottom: 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      &__preview {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
      }
      &__button {
        background-color: rgba($color-purple-light, 0) !important;
        border: 1px solid rgba($color-purple-light, 0.2);
        color: $color-purple-light;
        margin: 0px;
        margin-bottom: 20px;
        &:hover {
          background-color: rgba($color-purple-light, 0.2) !important;
        }
        &::before {
          content: none;
        }
        &__icon {
          margin-right: 10px;
        }
      }
    }
    &__error-messages {
      min-height: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: $color-red;
      width: 100%;
      padding: 5px 20px;
      flex-grow: 1;
    }
    &__buttons {
      margin-bottom: 40px;
      display: flex;
      width: 100%;
      padding: 0 20px;
      &__button {
        margin: 0px;
        flex-grow: 1;
        height: 40px;
        &--skip {
          background-color: rgba($color-purple-light, 0) !important;
          border: 1px solid rgba($color-purple-light, 0.2);
          color: $color-purple-light;
          &:hover {
            background-color: rgba($color-purple-light, 0.2) !important;
          }
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
