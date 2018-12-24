<template>
  <div class="signup">
    <div class="signup__stepper">
      <slot name="stepper" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .signup {
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
