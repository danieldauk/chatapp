<template>
   <div class="contact">
    <div class="contact__avatar">
      <img
        class="contact__avatar__image"
        :src="imageLink"
      >
    </div>
    <div class="contact__name">{{ name | truncateString(30) }}</div>
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
      return this.$store.getters['contact/getImageLink'](this.id);
    },
    name() {
      return this.$store.getters['contact/getName'](this.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.contact {
  display: flex;
  align-items: center;
  padding: 10px 15px;
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
