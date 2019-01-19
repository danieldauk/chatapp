<template>
  <div
    class="conversation"
    @click="onClickHandler"
  >
    <div class="conversation__avatars">
      <img
        v-for="(participant, index) in shownParticipants"
        :key="participant._id"
        class="conversation__avatars__image"
        :src="avatarLink(participant.avatar)"
        :style="{left: avatarPosition(index)}"
      >
      <div
        v-if="remainingParticipants > 0"
        :style="{left: `${maxAvatars * 20}px`}"
        class="conversation__avatars__remaining"
      >
        +{{ remainingParticipants }}
      </div>
    </div>
    <div class="conversation__info">
      <div class="conversation__info__title">
        {{ conversation.title | truncateString(20) }}
      </div>
      <div class="conversation__info__last-message">
        {{ lastMessage | truncateString(20) }}
      </div>
    </div>
    <div
      v-if="unreadMessages"
      class="conversation__unread-messages"
    >
      {{ unreadMessages }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    conversation: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      maxAvatars: 4
    };
  },
  computed: {
    remainingParticipants() {
      return this.conversation.participants.length - this.maxAvatars;
    },
    shownParticipants() {
      return this.conversation.participants.slice(0, this.maxAvatars + 1);
    },
    lastMessage() {
      return this.$store.getters['message/getLast'](this.conversation._id);
    },
    unreadMessages() {
      const unreadMessages = this.$store.getters['message/getUnreadCount'](
        this.conversation._id
      );
      return unreadMessages > 99 ? '99' : unreadMessages;
    }
  },
  methods: {
    avatarPosition(index) {
      if (index === 0) {
        return '0px';
      }
      return `${index * 20}px`;
    },
    avatarLink(avatarFileName) {
      return `${process.env.VUE_APP_BASE_URL}/${avatarFileName}`;
    },
    onClickHandler() {
      this.$store.dispatch(
        'message/clearUnreadConversationMessages',
        this.conversation._id
      );
      this.loadConversation();
    },
    async loadConversation() {
      if (
        this.$store.getters['conversation/getCurrentId']
        === this.conversation._id
      ) {
        return;
      }
      await this.$store.dispatch('conversation/setCurrent', this.conversation);
      this.$store.dispatch('conversation/loadHistory', this.conversation._id);
    }
  }
};
</script>

<style lang="scss" scoped>
.conversation {
  display: grid;
  grid-template-columns: 5fr 5fr 15px;
  height: 60px;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background: rgba(255, 255, 255, 0.05);
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
  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1.2;
    &__title {
      color: rgba($color-purple-light, 0.7);
    }
    &__last-message {
      font-size: 13px;
      color: $color-purple-medium;
      max-height: 1.1em;
      overflow: hidden;
    }
  }
  &__avatars {
    display: flex;
    align-items: center;
    margin-right: 15px;
    position: relative;
    &__image {
      height: 35px;
      position: absolute;
      width: 35px;
      border-radius: 50%;
      object-fit: cover;
    }
    &__remaining {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      background: $color-silver;
      height: 35px;
      width: 35px;
      border-radius: 50%;
      color: $color-purple-dark;
    }
  }
}
</style>
