<template>
  <div class="chat">
    <div class="chat__header">
      <slot name="header" />
    </div>
    <div class="chat__body">
      <slot name="body" />
    </div>
    <div class="chat__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .chat {
    display: grid;
    grid-template-rows: 60px 1fr 60px;
    background: $color-purple-light;
    height: 100%;
  }
</style>
