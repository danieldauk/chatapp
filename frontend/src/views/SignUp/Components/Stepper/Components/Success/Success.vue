<template>
  <div class="signup-success">
    <v-icon
      class="signup-success__icon"
      color="success"
    >
      check_circle_outline
    </v-icon>
    <div class="signup-success__text">
      Your account has been successfully created.
    </div>
    <v-btn
      class="signup-success__button"
      depressed
      to="/login"
      block
      color="success"
    >
      Login
    </v-btn>
  </div>
</template>


<style lang="scss" scoped>
.signup-success {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 20px 80px;
  position: relative;
  &__icon {
    font-size: 120px;
    margin-bottom: 20px;
  }
  &__text {
    color: $color-purple-light;
    text-align: center;
  }
  &__button {
    flex-grow: 0;
    position: absolute;
    bottom: 40px;
    height: 40px;
    text-transform: none;
    width: calc(100% - 40px);
    margin: 0;
    font-size: 16px;
  }
}
</style>
