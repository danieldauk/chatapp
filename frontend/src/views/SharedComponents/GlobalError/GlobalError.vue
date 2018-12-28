<template>
  <v-alert
    class="global-error"
    :value="globalError"
    color="error"
    icon="warning"
    dismissible
    @input="clearGlobalError"
  >
    {{ globalError }}
  </v-alert>
</template>

<script>
export default {
  computed: {
    globalError() {
      return this.$store.getters['globalError/getCurrent'];
    }
  },
  methods: {
    clearGlobalError(isErrorShown) {
      if (!isErrorShown) {
        this.$store.dispatch('globalError/clearCurrent');
      }
    }
  }
};
</script>


<style lang="scss" scoped>
  .global-error {
    position: fixed;
    width: 100%;
    z-index: 1000;
    height: 60px;
    box-sizing: border-box;
    margin: 0;
    top: calc(100vh - 60px);
    color: $color-white;
    /deep/ .v-icon {
      color: rgba($color-purple-dark, 0.5);
    }
  }
</style>
