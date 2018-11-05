<template>
  <div class="login">
    <div class="login__form">
      <slot name='form'/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .login {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('../../../assets/background.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
</style>
