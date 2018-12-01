<template>
  <div class="menu">
    <v-navigation-drawer
      class="menu__drawer"
      permanent
    >
      <app-menu-content />
    </v-navigation-drawer>
  </div>
</template>

<script>
import MenuContent from './Components/MenuContent/MenuContent.vue';


export default {
  components: {
    appMenuContent: MenuContent
  }
};
</script>


<style lang="scss" scoped>
  .menu {
    height: 100%;
    width: max-content;
    &__drawer {
      background: $color-purple-dark;
    }
  }
</style>
