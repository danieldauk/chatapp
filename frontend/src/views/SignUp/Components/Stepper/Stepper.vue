<template>
  <v-stepper
    class="stepper"
    :value="currentStep"
  >
    <v-stepper-header class="stepper__header">
      <v-stepper-step
        class="stepper__header__step"
        step="1"
        :complete="currentStep !== 1"
      />
      <v-divider class="stepper__header__divider" />
      <v-stepper-step
        :complete="currentStep > 2"
        class="stepper__header__step"
        step="2"
      />
      <v-divider class="stepper__header__divider" />
      <v-stepper-step
        class="stepper__header__step"
        step="3"
      />
    </v-stepper-header>
    <v-stepper-content
      class="stepper__content"
      step="1"
    >
      <app-credentials-form />
    </v-stepper-content>
    <v-stepper-content
      class="stepper__content"
      step="2"
    >
      <app-avatar-cropper :step="currentStep" />
    </v-stepper-content>
    <v-stepper-content
      class="stepper__content"
      step="3"
    >
      <app-success />
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import CredentialsForm from './Components/CredentialsForm/CredentialsForm.vue';
import AvatarCropper from './Components/AvatarCropper/AvatarCropper.vue';
import Success from './Components/Success/Success.vue';

export default {
  components: {
    appCredentialsForm: CredentialsForm,
    appAvatarCropper: AvatarCropper,
    appSuccess: Success
  },
  computed: {
    currentStep() {
      return this.$store.state.UI.currentSignUpStep;
    }
  }
};
</script>

<style lang="scss" scoped>
.stepper {
  width: 300px;
  height: 500px;
  background: rgba($color-purple-dark, 0.6);
  box-shadow: none;
  display: flex;
  flex-direction: column;
  &__header {
    box-shadow: none;
    border-bottom: 1px solid rgba($color-purple-light, 0.2);
    height: 70px;
    &__step {
      padding: 20px;
      /deep/ .v-stepper__step__step {
        background-color: $color-purple-ultra-dark !important;
        color: $color-purple-light;
        margin: 0;
      }
      &.v-stepper__step--complete {
        /deep/ .v-stepper__step__step {
          background-color: $color-green !important;
        }
      }
      &.v-stepper__step--active {
        /deep/ .v-stepper__step__step {
          background-color: $color-blue-light !important;
        }
      }
    }
    &__divider {
      border-color: rgba($color-purple-light, 0.2) !important;
    }
  }
  &__content {
    padding: 0px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    /deep/ .v-stepper__wrapper {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
