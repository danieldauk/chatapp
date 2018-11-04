<template>
  <v-text-field
    :value="password"
    :type="isPasswordShown ? 'text' : 'password'"
    :append-icon="isPasswordShown ? 'visibility_off' : 'visibility'"
    @click:append="isPasswordShown = !isPasswordShown"
    :rules="validationRules"
    label="Password"
    :error-messages="error"
    validate-on-blur
    required
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
        return this.$store.getters['loginForm/getError']('password');
      },
      password() {
        return this.$store.state.loginForm.data.password;
      }
    },
    methods: {
      clearError() {
        this.$store.dispatch('loginForm/clearError', 'password');
      },
      setFormElementValue(value) {
        this.$store.dispatch('loginForm/setValue', {
          value,
          id: 'password'
        });
      }
    }
  };
</script>

<style lang="scss" scoped>

</style>
