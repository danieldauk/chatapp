<template>
  <div class="header">
    <div class="header__user-info">
      <img
        class="header__user-info__avatar"
        :src="imageLink"
      >
      <div class="header__user-info__name">
        {{ name | truncateString(20) }}
      </div>
    </div>
    <app-dropdown class="header__dropdown" />
  </div>
</template>

<script>
import Dropdown from './Components/Dropdown.vue';

export default {
  components: {
    appDropdown: Dropdown
  },
  computed: {
    imageLink() {
      return this.$store.getters['user/getAvatarLink'];
    },
    name() {
      return this.$store.getters['user/getName'];
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  &__dropdown {
  }
  &__user-info {
    display: flex;
    align-items: center;
    &__name {
      color: $color-purple-light;
    }
    &__avatar {
      margin-right: 15px;
      height: 35px;
      width: 35px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
}
</style>
