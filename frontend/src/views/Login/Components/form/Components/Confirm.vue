<template>
  <v-btn
    :loading="isLoading"
    type="submit"
    block
    depressed
    color="success"
  >
    Login
  </v-btn>
</template>

<script>
export default {
  computed: {
    isLoading() {
      return this.$store.state.login.isLoading;
    }
  }
};
</script>

<style lang="scss" scoped>
  .v-btn {
    height: 40px;
    width: 100%;
    text-transform: capitalize;
    font-size: 16px;
    margin: 0;
  }
</style>
