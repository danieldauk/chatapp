<template>
  <div class="contact" @click="loadConversation">
    <div class="contact__avatar">
      <img class="contact__avatar__image" :src="imageLink">
      <div
        :class="['contact__avatar__online-indicator', {'contact__avatar__online-indicator--is-online': isOnline}]"
      />
    </div>
    <div class="contact__info">
      <div class="contact__info__name">{{ name | truncateString(20) }}</div>
      <div class="contact__info__last-message">{{ lastMessage | truncateString(20) }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    conversationId: {
      type: String,
      required: true
    }
  },
  computed: {
    imageLink() {
      return this.$store.getters["contact/getAvatarLink"](this.id);
    },
    name() {
      return this.$store.getters["contact/getName"](this.id);
    },
    isOnline() {
      return this.$store.getters["person/isOnline"](this.id);
    },
    lastMessage() {
      return this.$store.getters["message/getLast"](this.conversationId);
    }
  },
  methods: {
    async loadConversation() {
      // check if conversation loaded is the same
      if (
        this.$store.getters["conversation/getCurrentId"] === this.conversationId
      ) {
        return;
      }
      const conversation = await this.$store.getters["conversation/getById"](
        this.conversationId
      );
      if (conversation) {
        await this.$store.dispatch("conversation/setCurrent", conversation);
        this.$store.dispatch("conversation/loadHistory", conversation._id);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.contact {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1.2;
    &__name {
      color: rgba($color-purple-light, 0.7);
    }
    &__last-message {
      font-size: 13px;
      color: $color-purple-medium;
    }
  }

  &__avatar {
    display: flex;
    align-items: center;
    margin-right: 15px;
    position: relative;
    &__online-indicator {
      position: absolute;
      top: 3px;
      right: 0;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid $color-purple-dark;
      background: $color-purple-medium;
      &--is-online {
        background: $color-green;
      }
    }
    &__image {
      height: 35px;
      width: 35px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
}
</style>
