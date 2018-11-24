<template>
  <v-text-field
    :value="username"
    :rules="validationRules"
    label="Username"
    :error-messages="error"
    validate-on-blur
    required
    @input="setFormElementValue"
    @focus="clearError"
  />
</template>

<script>
import { usernameRules } from '@/utils/validationRules';

export default {
  data() {
    return {
      validationRules: usernameRules.all
    };
  },
  computed: {
    error() {
      return this.$store.getters['loginForm/getError']('username');
    },
    username() {
      return this.$store.state.loginForm.data.username;
    }
  },
  methods: {
    clearError() {
      this.$store.dispatch('loginForm/clearError', 'username');
    },
    setFormElementValue(value) {
      this.$store.dispatch('loginForm/setValue', {
        value,
        id: 'username'
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
