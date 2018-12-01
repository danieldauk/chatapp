<template>
  <div class="home">
    <div class="home__menu">
      <slot class="home__menu__slot" name="menu"/>
    </div>
    <div class="home__chat">
      <slot name="chat"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 300px auto;
}
</style>
