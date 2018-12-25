<template>
<!-- TODO: set value to currentStep -->
  <v-stepper class="stepper" 
  :value="2"
  >
    <v-stepper-header class="stepper__header">
      <v-stepper-step step="1"/>
      <v-divider />
      <v-stepper-step step="2"/>
      <v-divider />
      <v-stepper-step step="3"/>
    </v-stepper-header>
    <v-stepper-content class="stepper__content" step="1">
      <app-credentials-form/>
    </v-stepper-content>
    <v-stepper-content class="stepper__content" step="2">
      <app-avatar-form />
    </v-stepper-content>
    <v-stepper-content class="stepper__content" step="2">
      <!-- TODO: add success message and link to login page -->
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import CredentialsForm from "./Components/CredentialsForm/CredentialsForm.vue";
import AvatarForm from "./Components/AvatarForm/AvatarForm.vue";

export default {
  components: {
    appCredentialsForm: CredentialsForm,
    appAvatarForm: AvatarForm,
  },
  computed: {
    currentStep() {
      if (!this.$store.state.signup.current && !this.$store.state.login.token) {
        return 1;
      }
      if (this.$store.state.signup.current && !this.$store.state.login.token) {
        return 2;
      }
      return 3;
    }
  }
};
</script>

<style lang="scss" scoped>
.stepper {
  width: 300px;
  height: 500px;
  background: rgba($color-purple-dark, 0.6);
  &__header {
    box-shadow: none;
    border-bottom: 1px solid rgba($color-purple-light, 0.2);
  }
}
</style>

