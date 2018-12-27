<template>
  <app-sign-up>
    <app-stepper slot="stepper" />
  </app-sign-up>
</template>

<script>
import SignUp from './Layout/SignUp.vue';
import Stepper from './Components/Stepper/Stepper.vue';

export default {
  components: {
    appSignUp: SignUp,
    appStepper: Stepper
  },
  destroyed() {
    this.$store.dispatch('signup/reset');
    this.$store.dispatch("UI/setCurrentSignUpStep", 1);
  }
};
</script>

<style lang="scss" scoped>

</style>
