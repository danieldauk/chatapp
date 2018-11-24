<template>
  <div class="menu-content">
    <div 
    :style="headerStyle"
    class="menu-content__header">
      <div class="menu-content__header__user-info">
        <slot name="user-info" />
      </div>
      <div class="menu-content__header__toggle">
        <slot name="toggle" />
      </div>
    </div>
    <div class="menu-content__search">
      <slot name="search" />
    </div>
    <div class="menu-content__contacts">
      <slot name="contacts" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isMenuMinified() {
      return this.$store.state.UI.isMenuMinified;
    },
    headerStyle() {
      return this.isMenuMinified ? {
        justifyContent: 'center'
      } : {
        justifyContent: 'space-between'
      };
    }
  }

};
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
