<template>
  <div class="menu-content">
    <div class="menu-content__header">
      <slot name="header"/>
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
    <div class="menu-content__footer">
      <slot name='footer' />
    </div>
  </div>
</template>

<script>
</script>


<style lang="scss" scoped>
.menu-content {
  height: 100%;
  display: grid;
  grid-template-rows: 60px 60px 60px minmax(300px, 1fr) 60px;
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    background: $color-purple-ultra-dark;
    height: 60px;
  }
  &__contacts {
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
      background: $color-blue-dark;
    }
  }
}
</style>
