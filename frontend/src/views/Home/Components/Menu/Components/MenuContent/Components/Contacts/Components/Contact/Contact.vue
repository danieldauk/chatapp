<template>
  <div
    :class="['contact', {'contact--is-current': isCurrent}]"
    @click="onClickHandler"
  >
    <div class="contact__avatar">
      <img
        class="contact__avatar__image"
        :src="imageLink"
      >
      <div
        :class="['contact__avatar__online-indicator', {'contact__avatar__online-indicator--is-online': isOnline}]"
      />
    </div>
    <div class="contact__info">
      <div class="contact__info__name">
        {{ name | truncateString(20) }}
      </div>
      <div class="contact__info__last-message">
        {{ lastMessage | truncateString(30) }}
      </div>
    </div>
    <div
      v-if="unreadMessages"
      class="contact__unread-messages"
    >
      {{ unreadMessages }}
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
      return this.$store.getters['contact/getAvatarLink'](this.id);
    },
    isCurrent() {
      return this.$store.getters['conversation/getCurrentId'] === this.conversationId;
    },
    name() {
      return this.$store.getters['contact/getName'](this.id);
    },
    isOnline() {
      return this.$store.getters['person/isOnline'](this.id);
    },
    lastMessage() {
      return this.$store.getters['message/getLast'](this.conversationId);
    },
    unreadMessages() {
      const unreadMessages = this.$store.getters['message/getUnreadCount'](this.conversationId);
      return unreadMessages > 99 ? '99' : unreadMessages;
    }
  },
  methods: {
    onClickHandler() {
      if (this.$mq === 'sm') {
        this.$store.dispatch('UI/closeMenu');
      }
      this.$store.dispatch(
        'message/clearUnreadConversationMessages',
        this.conversationId
      );
      this.loadConversation();
    },
    async loadConversation() {
      // check if conversation loaded is the same
      if (
        this.$store.getters['conversation/getCurrentId'] === this.conversationId
      ) {
        return;
      }
      const conversation = await this.$store.getters['conversation/getById'](
        this.conversationId
      );
      if (conversation) {
        await this.$store.dispatch('conversation/setCurrent', conversation);
        this.$store.dispatch('conversation/loadHistory', conversation._id);
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
  &:hover:not(&--is-current) {
    background: rgba(255, 255, 255, 0.05);
  }
  &--is-current {
    background: $color-purple-ultra-dark;
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
      max-height: 1.1em;
      overflow: hidden;
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
  &__unread-messages {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    color: $color-white;
    background: $color-green;
    height: 15px;
    width: 15px;
    font-size: 8px;
    border-radius: 50%;
  }
}
</style>
