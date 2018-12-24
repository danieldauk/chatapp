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
      return this.$store.getters['signupForm/getError']('username');
    },
    username() {
      return this.$store.state.signupForm.data.username;
    }
  },
  methods: {
    clearError() {
      this.$store.dispatch('signupForm/clearError', 'username');
    },
    setFormElementValue(value) {
      this.$store.dispatch('signupForm/setValue', {
        value,
        id: 'username'
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
