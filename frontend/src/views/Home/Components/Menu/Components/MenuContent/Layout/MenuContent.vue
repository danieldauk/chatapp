<template>
  <div class="menu-content">
    <div class="menu-content__header">
      <slot name="user-info"/>
    </div>
    <div class="menu-content__tabs">
      <slot name="tabs"/>
    </div>
    <div class="menu-content__search">
      <slot name="search"/>
    </div>
    <div class="menu-content__contacts">
      <slot name="activeTabItem"/>
    </div>
  </div>
</template>

<script>
</script>


<style lang="scss" scoped>
.menu-content {
  display: flex;
  flex-direction: column;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    background: $color-purple-ultra-dark;
    height: 60px;
  }
  &__contacts {
    max-height: calc(100vh - 181px);
    min-height: 300px;
    overflow-x: auto;
    &::-webkit-scrollbar-track-piece {
      background: $color-purple-dark;
    }
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-button {
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      background: $color-silver;
    }
  }
}
</style>
