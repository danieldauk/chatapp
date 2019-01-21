<template>
  <div
    v-resize="checkVH"
    class="home"
  >
    <div
      v-if="$mq === 'sm'"
      class="home__header"
    >
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

<script>
import throttle from 'lodash/throttle';

export default {
  methods: {
    checkVH: throttle(() => {
      const innerHeight = window.innerHeight;
      const vh = innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 100)
  }
};
</script>


<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 300px auto;
}

@media (max-width: 665px) {
  .home {
    overflow: hidden;
    position: relative;
    grid-template-columns: auto;
    grid-template-rows: 60px minmax(450px, calc(calc(var(--vh, 1vh) * 100) - 60px));
    &__header {
      grid-row: 1 / 2;
    }
    &__chat {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
      width: 100%;
    }
  }
}
</style>
