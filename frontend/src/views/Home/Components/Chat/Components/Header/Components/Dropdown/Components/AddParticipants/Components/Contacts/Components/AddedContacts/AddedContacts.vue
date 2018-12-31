<template>
  <div class="added-participants">
    <div class="added-participants__header">
      Selected participants:
    </div>
    <div class="added-participants__participants">
      <div
        v-for="participant in addedConversationParticipants"
        :key="participant"
        class="added-participants__participants__contact"
      >
        <img
          class="added-participants__participants__contact__image"
          :src="imageLink(participant)"
        >
        <div
          class="added-participants__participants__contact__name"
        >
          {{ name(participant) | truncateString(10) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    addedConversationParticipants: {
      type: Array,
      required: true
    }
  },
  methods: {
    imageLink(id) {
      return this.$store.getters['contact/getAvatarLink'](id);
    },
    name(id) {
      return this.$store.getters['contact/getName'](id);
    }
  }
};
</script>

<style lang="scss" scoped>
.added-participants {
  display: flex;
  flex-direction: column;

  &__header {
    color: $color-purple-dark;
    font-weight: 500;
    line-height: 1;
    padding: 10px 10px 0px;
  }
  &__participants {
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
    &__contact {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      min-width: 50px;
      width: 50px;
      overflow: hidden;
      &:not(:last-child) {
        margin-right: 5px;
      }
      &__name {
        font-size: 10px;
      }
      &__image {
        height: 35px;
        width: 35px;
        border-radius: 50%;
        object-fit: cover;
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
