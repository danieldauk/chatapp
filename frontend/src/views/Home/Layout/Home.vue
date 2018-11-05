<template>
  <div class="home">
    <div class="home__contacts">
      <slot name="contacts" />
    </div>
    <div class="home__chat">
      <slot name="chat" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .home {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: max-content auto;
  }
</style>
