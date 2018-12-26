<template>
  <v-stepper
    class="stepper"
    :value="currentStep"
  >
    <v-stepper-header class="stepper__header">
      <v-stepper-step step="1" />
      <v-divider />
      <v-stepper-step step="2" />
      <v-divider />
      <v-stepper-step step="3" />
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
      <app-avatar-cropper :step="currentStep"/>
    </v-stepper-content>
    <v-stepper-content
      class="stepper__content"
      step="3"
    >
      <!-- TODO: add success message and link to login page -->
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import CredentialsForm from './Components/CredentialsForm/CredentialsForm.vue';
import AvatarCropper from './Components/AvatarCropper/AvatarCropper.vue';

export default {
  components: {
    appCredentialsForm: CredentialsForm,
    appAvatarCropper: AvatarCropper
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
