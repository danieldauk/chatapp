<template>
  <div class="chat">
    <div class="chat__header">
      <slot name="header"/>
    </div>
    <div ref="body" class="chat__body">
      <slot name="body"/>
    </div>
    <div class="chat__footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  display: flex;
  flex-direction: column;
  background: $color-purple-light;
  min-height: 450px;
  height: 100vh;
  position: relative;
  &__header {
    position: absolute;
    width: 100%;
    top: 0;
  }
  &__body {
    display: grid;
    grid-template-columns: 1fr repeat(12, minmax(30px, 70px)) 1fr;
    height: 100%;
    padding: 60px 0;
    overflow: hidden;
  }
  &__footer {
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}
</style>
