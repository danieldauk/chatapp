<template>
  <v-dialog 
  max-width="300px"
  class="dialog">
    <app-button slot="activator" />
    <div class="dialog__content">
    </div>
  </v-dialog>
</template>

<script>
import Button from "./Components/Button/Button.vue";

export default {
  components: {
    appButton: Button
  }
}
</script>

<style lang="scss" scoped>
  .dialog {
    width: 100%;
    /deep/ &__content {
      height: 500px;
      background: $color-white;
    }
  }
</style>
