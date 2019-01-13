<template>
  <div class="unread-messages">
    <div class="unread-messages__line" />
    <div class="unread-messages__text">
      Unread messages
    </div>
    <div class="unread-messages__line" />
  </div>
</template>


<style lang="scss" scoped>
  .unread-messages {
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin-top: 10px;
    &__line {
      height: 1px;
      flex-grow: 1;
      background: $color-blue-medium;
    }
    &__text {
      color: $color-blue-medium;
      font-size: 12px;
      padding: 0 10px;
    }
  }
</style>
