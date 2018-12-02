<template>
  <div class="person">
    <div class="person__avatar">
      <img class="person__avatar__image" :src="imageLink">
    </div>
    <div class="person__name">{{ name | truncateString(30) }}</div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    imageLink() {
      return this.$store.getters["people/getAvatarLink"](this.id);
    },
    name() {
      return this.$store.getters["people/getName"](this.id);
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.person {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  &__name {
    color: $color-purple-light;
  }
  &__avatar {
    display: flex;
    align-items: center;
    margin-right: 15px;
    &__image {
      height: 35px;
      width: 35px;
      border-radius: 50%;
    }
  }
}
</style>
