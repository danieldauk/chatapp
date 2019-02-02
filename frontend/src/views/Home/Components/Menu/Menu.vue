<template>
  <div class="menu">
    <v-navigation-drawer
      class="menu__drawer"
      :value="isMenuOpen"
      hide-overlay
      :permanent="$mq === 'sm'? false : true"
      absolute
      @input="closeMenu($event)"
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
  },
  computed: {
    isMenuOpen() {
      return this.$mq === 'sm' ? this.$store.state.UI.isMenuOpen : true;
    }
  },
  methods: {
    closeMenu(isMenuOpen) {
      if (!isMenuOpen) {
        this.$store.dispatch('UI/closeMenu');
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.menu {
  height: 100%;
  width: max-content;
  &__drawer {
    background: $color-purple-dark;
    box-shadow: none;
  }
}
@media (max-width: 665px) {
  .menu {
    &__drawer {
      top: 60px;
      left: 0;
      height: minmax(320px, calc(calc(var(--vh, 1vh) * 100) - 60px));
    }
  }
}
</style>
