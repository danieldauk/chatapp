<template>
  <v-text-field
    :value="repeatedPassword"
    :type="isPasswordShown ? 'text' : 'password'"
    :append-icon="isPasswordShown ? 'visibility_off' : 'visibility'"
    :rules="validationRules"
    label="Repeat password"
    validate-on-blur
    required
    @click:append="isPasswordShown = !isPasswordShown"
    @input="setFormElementValue"
  />
</template>

<script>

export default {
  data() {
    return {
      validationRules: [
        value =>
          value === this.$store.state.signupForm.data.password ||
          "Repeated password doesn't match above entered password."
      ],
      isPasswordShown: false
    };
  },
  computed: {
    repeatedPassword() {
      return this.$store.state.signupForm.data.repeatedPassword;
    }
  },
  methods: {
    setFormElementValue(value) {
      this.$store.dispatch("signupForm/setValue", {
        value,
        id: "repeatedPassword"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
