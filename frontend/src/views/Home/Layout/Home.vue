<template>
  <div class="home">
    <div v-if="$mq === 'sm'" class="home__header">
      <slot name="header" />
    </div>
    <div class="home__menu">
      <slot
        class="home__menu__slot"
        name="menu"
      />
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
  grid-template-columns: 300px auto;
}

@media(max-width: 665px) {
  .home {
    position: relative;
    grid-template-columns: auto;
    grid-template-rows: 60px calc(100vh - var(--vh-offset, 0px) - 60px);
    &__header {
      grid-row: 1 / 2;
    }
    &__menu {
      position: absolute;
    }
    &__chat {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
      width: 100%;
    }
  }
}
</style>
