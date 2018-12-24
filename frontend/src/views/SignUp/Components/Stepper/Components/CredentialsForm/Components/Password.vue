<template>
  <v-text-field
    :value="password"
    :type="isPasswordShown ? 'text' : 'password'"
    :append-icon="isPasswordShown ? 'visibility_off' : 'visibility'"
    :rules="validationRules"
    label="Password"
    :error-messages="error"
    validate-on-blur
    required
    @click:append="isPasswordShown = !isPasswordShown"
    @input="setFormElementValue"
    @focus="clearError"
  />
</template>

<script>
import { passwordRules } from '@/utils/validationRules';

export default {
  data() {
    return {
      validationRules: passwordRules.all,
      isPasswordShown: false
    };
  },
  computed: {
    error() {
      return this.$store.getters['signupForm/getError']('password');
    },
    password() {
      return this.$store.state.signupForm.data.password;
    }
  },
  methods: {
    clearError() {
      this.$store.dispatch('signupForm/clearError', 'password');
    },
    setFormElementValue(value) {
      this.$store.dispatch('signupForm/setValue', {
        value,
        id: 'password'
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
