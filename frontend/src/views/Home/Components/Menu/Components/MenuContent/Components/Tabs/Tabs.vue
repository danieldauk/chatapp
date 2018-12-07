<template>
  <div class="tabs">
    <div 
    :style="{left: sliderPosition}"
    class="tabs__slider"></div>
    <div
      @click="clickHandler(tabEnum.CONTACTS)"
      :class="['tabs__tab', {'tabs__tab--active': activeMenuTab === tabEnum.CONTACTS}]"
    >
      <v-icon class="tabs__tab__icon">people</v-icon>
      <span class="tabs__tab__text">Contacts</span>
    </div>
    <div
      @click="clickHandler(tabEnum.CHATS)"
      :class="['tabs__tab', {'tabs__tab--active': activeMenuTab === tabEnum.CHATS}]"
    >
      <v-icon class="tabs__tab__icon">chat_bubble</v-icon>
      <span class="tabs__tab__text">Chats</span>
    </div>
    <div
      @click="clickHandler(tabEnum.PEOPLE)"
      :class="['tabs__tab', {'tabs__tab--active': activeMenuTab === tabEnum.PEOPLE}]"
    >
      <v-icon class="tabs__tab__icon">search</v-icon>
      <span class="tabs__tab__text">People</span>
    </div>
  </div>
</template>

<script>
import { ActiveTabEnum } from "@/utils/enumerators";

export default {
  computed: {
    activeMenuTab() {
      return this.$store.state.UI.activeMenuTab;
    },
    tabEnum() {
      return ActiveTabEnum;
    },
    sliderPosition() {
      switch (this.activeMenuTab) {
        case this.tabEnum.CONTACTS:
          return "0%";
        case this.tabEnum.CHATS:
          return "33.33%";
        case this.tabEnum.PEOPLE:
          return "66.66%";
        default:
          return "0%";
      }
    }
  },
  methods: {
    clickHandler(tab) {
      if (tab !== this.activeMenuTab) {
        this.setActiveTab(tab);
        this.$store.dispatch("searchForm/reset");
      }
    },
    setActiveTab(tab) {
      this.$store.dispatch("UI/setActiveTab", tab);
    }
  }
};
</script>


<style lang="scss" scoped>
.tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-bottom: 1px solid rgba($color-silver, 0.3);
  position: relative;
  &__slider {
    width: 33.33%;
    position: absolute;
    bottom: -1px;
    left: 0;
    height: 1px;
    background: $color-purple-light;
    transition: 0.3s;
  }
  &__tab {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 33.33%;
    opacity: 0.7;
    cursor: pointer;
    transition: 0.3s;
    &--active {
      opacity: 1;
    }
    &__icon {
      color: $color-purple-light;
      margin-bottom: 2px;
    }
    &__text {
      color: $color-purple-light;
      font-size: 10px;
    }
  }
}
</style>
