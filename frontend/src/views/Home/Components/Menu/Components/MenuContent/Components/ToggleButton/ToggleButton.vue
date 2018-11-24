<template>
  <v-icon
    class="icon"
    @click.native="toggleMenu"
  >mdi-menu</v-icon>
</template>

<script>
export default {
  methods: {
    toggleMenu() {
      if (this.$store.state.UI.isMenuMinified) {
        this.$store.dispatch('UI/maxifyMenu');
        return;
      }
      this.$store.dispatch('UI/minifyMenu');
    }
  }
};
</script>

<style lang="scss" scoped>
  .icon {
    cursor: pointer;
    color: $color-purple-light;
  }
</style>
