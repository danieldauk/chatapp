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
      <slot name="contacts"/>
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
}
</style>
