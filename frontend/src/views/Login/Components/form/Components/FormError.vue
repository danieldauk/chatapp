<template>
  <div class="login-form-error">
    <div
      v-if="isErrorShown"
      class="login-form-error__content"
    >
      <v-icon
        class="login-form-error__content__icon"
        color="error"
      >
        error
      </v-icon>
      <div class="login-form-error__content__text">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    text() {
      return this.$store.getters['loginForm/getError']('default');
    },
    isErrorShown() {
      return !!this.text;
    }
  }
};
</script>


<style lang="scss" scoped>
.login-form-error {
  display: flex;
  align-items: center;
  height: 80px;
  margin-bottom: 60px;
  &__content {
    display: flex;
    align-items: center;
    &__icon {
      margin-right: 15px;
    }
    &__text {
      font-size: 12px;
      color: $color-red;
    }
  }
}
</style>
