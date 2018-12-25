<template>

  <div id="app">

    <input 
      type="file" 
      style="display: none"
      name="image" 
      accept="image/*"
      ref="fileInput"
      @change="setImage" />
    <br/>
    <div style="width: 240px; height:210px; display: flex; justify-content: center;">
      <vue-cropper
          v-if='imgSrc'
          :cropmove="cropImage"
          :zoom="cropImage"
          :ready="cropImage"
          ref='cropper'
          :guides="false"
          :view-mode="2"
          drag-mode="crop"
          :auto-crop-area="1"
          :min-container-width="200"
          :min-container-height="200"
          :background="false"
          :rotatable="true"
          :src="imgSrc"
          alt="Avatar Image"
          :img-style="{ 'width': '200px', 'height': '200px' }">
      </vue-cropper>
      
    </div>
    <img :src="cropImg" v-if="cropImg" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;" alt="Cropped Image" />
    <button @click='rotateLeft'>Left</button>
    <button @click='rotateRight'>Right</button>
    <button @click='resetRotation'>Reset rotation</button>
    <button @click='$refs.fileInput.click()'> Upload </button>
  </div>

</template>

<script>
  import VueCropper from 'vue-cropperjs';
  import Avatar from '@/assets/defaultAvatar.png';

  export default {
    components: {
      VueCropper,
    },
    data() {
      return {
        imgSrc: Avatar,
        cropImg: '',
        maxFileSize: 2097152 //bytes
      };
    },
    methods: {
      setImage(e) {
        const file = e.target.files[0];
        if (!file.type.includes('image/')) {
          alert('Please select an image file');
          return;
        }
        if (!file.size >= this.maxFileSize) {
          alert(`File is too large. Max size: ${this.maxFileSize} bytes`);
          return;
        }
        if (typeof FileReader === 'function') {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.imgSrc = event.target.result;
            // rebuild cropperjs with the updated source
            this.$refs.cropper.replace(event.target.result);
          };
          reader.readAsDataURL(file);
        } else {
          alert('Sorry, FileReader API not supported');
        }
      },
      cropImage() {
        // get image data for post processing, e.g. upload or setting image src
        this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
      },
      rotateLeft() {
        this.$refs.cropper.rotate(-1);
        this.cropImage();
      },
      rotateRight() {
        this.$refs.cropper.rotate(1);
        this.cropImage();
      },
      resetRotation() {
        this.$refs.cropper.rotateTo(0); 
        this.cropImage();
      }
    }
  };
</script>

<style lang="scss" scoped>
  /deep/ .cropper-line {
    background-color: transparent;
  }
  /deep/ .cropper-view-box {
    outline-color: red;
  }
  /deep/ .cropper-point {
    background-color: red;
    border-radius: 50px;
    height: 5px;
    width: 5px;
    z-index: 100;
  }

</style>