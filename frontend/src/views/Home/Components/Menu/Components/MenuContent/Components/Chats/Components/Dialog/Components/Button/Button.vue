<template>
  <div class="button">
    <v-icon class="button__icon">group_add</v-icon>
    <span class="button__text">Create Conversation</span>
  </div>
</template>

<style lang="scss" scoped>
  .button {
    display: flex;
    align-items: center;
    width: 100%;
    height: 60px;
    padding-left: 15px;
    border-bottom: 1px solid rgba($color-purple-light, 0.2);
    cursor: pointer;
    transition: 0.3s;
    &:hover & {
      &__icon,
      &__text {
        color: rgba($color-purple-light, 0.9);
      }
    }
    &__icon {
      color: rgba($color-purple-light, 0.7);
      margin-right: 15px;
    }

    &__text {
      color: rgba($color-purple-light, 0.7);
      font-size: 14px;
    }
  }
</style>
