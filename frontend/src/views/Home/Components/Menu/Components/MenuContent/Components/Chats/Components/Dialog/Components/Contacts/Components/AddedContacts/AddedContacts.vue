<template>
  <div class="added-contacts">
    <div class="added-contacts__header">Selected contacts:</div>
    <div class="added-contacts__images">
        <img
          v-for="participant in conversationParticipants"
          :key="participant"
          class="added-contacts__images__image"
          :src="imageLink(participant)"
        >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    conversationParticipants: {
      type: Array,
      required: true
    }
  },
  methods: {
    imageLink(id) {
      return this.$store.getters["contact/getAvatarLink"](id);
    }
  }
};
</script>

<style lang="scss" scoped>
.added-contacts {
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  &__header {
    color: $color-purple-dark;
    font-weight: 500;
    line-height: 1;
    padding-top: 10px;
  }
  &__images {
    display: flex;
    width: 100%;
    overflow-x: auto;
    height: 60px;
    align-items: center;
    &::-webkit-scrollbar-track-piece {
      background: $color-purple-light;
    }
    &::-webkit-scrollbar {
      height: 5px;
    }
    &::-webkit-scrollbar-button {
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      background: $color-purple-medium;
    }
    &__image {
      height: 35px;
      width: 35px;
      border-radius: 50%;
      &:not(:last-child) {
        margin-right: 5px;
      }
    }
  }
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  opacity: 1;
  transition: 0.3s;
}
.fade-leave-active {
  opacity: 0;
  transition: 0.3s;
}
</style>
