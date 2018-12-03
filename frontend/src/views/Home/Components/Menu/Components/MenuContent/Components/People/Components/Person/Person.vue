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
    person: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageLink() {
      return this.$store.getters["person/getAvatarLink"](this.person._id);
    },
    name() {
      return this.$store.getters["person/getName"](this.person._id);
    },
    isFriend() {
      return thos.person.isFriend;
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
