<template>
  <div class="chat">
    <div class="chat__header">
      <slot name="header" />
    </div>
    <div
      ref="body"
      class="chat__body"
    >
      <slot name="body" />
    </div>
    <div class="chat__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  display: flex;
  flex-direction: column;
  background: $color-purple-light;
  height: 100%;
  &__header {

  }
  &__body {
    height: calc(100% - 120px);
  }
  &__footer {

  }
}
</style>
