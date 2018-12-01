<template>
  <v-tabs 
  class="tabs"
  centered color="#3b385d" 
  height="60"
  icons-and-text >
    <v-tabs-slider 
    class="tabs__slider"
    color="#a7a6be"></v-tabs-slider>
    <v-tab 
    :ripple="false"
    class="tabs__tab"
    >
      <span class="tabs__tab__text">Contacts</span>
      <v-icon class="tabs__tab__icon">people</v-icon>
    </v-tab>
    <v-tab 
    :ripple="false"
    class="tabs__tab">
      <span class="tabs__tab__text">Chats</span>
      <v-icon class="tabs__tab__icon">chat_bubble</v-icon>
    </v-tab>
    <v-tab 
    :ripple="false"
    class="tabs__tab">
      <span class="tabs__tab__text">Requests</span>
      <v-icon class="tabs__tab__icon">person_add</v-icon>
    </v-tab>
    <v-tab 
    :ripple="false"
    class="tabs__tab">
      <span class="tabs__tab__text">People</span>
      <v-icon class="tabs__tab__icon">search</v-icon>
    </v-tab>
  </v-tabs>
</template>

<style lang="scss" scoped>
  .tabs{
    /deep/ .v-tabs__slider-wrapper {
      bottom: -1px;
    }
    /deep/ .v-tabs__wrapper {
      contain:initial;
      overflow:initial;
    }
    /deep/ .v-tabs__item:not(.v-tabs__item--active) {
      opacity: 0.4;
    }
    border-bottom: 1px solid rgba($color-silver, 0.3);
    &__slider{
      width: 100%;
      height: 1px;
    }
    &__tab {
      min-width: 25%;
      &__icon {
        color: $color-purple-light;
      }
      &__text {
        color: $color-purple-light;
        font-size: 10px;
      }
    }
  }
</style>
