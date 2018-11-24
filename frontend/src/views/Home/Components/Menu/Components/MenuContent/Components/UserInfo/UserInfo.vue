<template>
  <div class="user-info">
    <div class="user-info__avatar">
      <img
        class="user-info__avatar__image"
        :src="imageLink"
      >
    </div>
    <div class="user-info__name">{{ name | truncateString(30) }}</div>
  </div>
</template>

<script>
export default {
  computed: {
    imageLink() {
      return this.$store.getters['user/getImageLink'];
    },
    name() {
      return this.$store.getters['user/getName'];
    }
  }
};
</script>

<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  &__name {
    color: $color-purple-light;
  }
  &__avatar {
    margin-right: 15px;
    display: flex;
    align-items: center;
    &__image {
      height: 35px;
      width: 35px;
      border-radius: 50%;
    }
  }
}
</style>
