<template>
  <div class="chat">
    <div class="chat__header">
      <slot name="header"/>
    </div>
    <div class="chat__body">
      <slot name="body"/>
    </div>
    <div class="chat__footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  padding: 60px 0;
  background: $color-purple-light;
  height: 100%;
  position: relative;
  &__header {
    position: fixed;
    width: 100%;
    top: 0px;
    z-index: 1;
  }
  &__body {
    height: calc(100vh - 120px);
    overflow: auto;
    &::-webkit-scrollbar-track-piece {
      background: rgba(0, 0, 0, 0);
    }
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-button {
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      background: $color-purple-medium;
    }
  }
  &__footer {
    position: fixed;
    width: 100%;
    bottom: 0px;
    z-index: 1;
  }
}
</style>
