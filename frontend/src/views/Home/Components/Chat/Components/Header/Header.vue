<template>
  <div class="chat-header">
    <div class="chat-header__title">{{conversationName | truncateString(30)}}</div>
    <div v-if="isDialogue" class="chat-header__contact-status">
      <div
        :class="['chat-header__contact-status__online-indicator', {'chat-header__contact-status__online-indicator--is-online': isContactOnline }]"
      />
      <div class="chat-header__contact-status__text">{{contactStatusText}}</div>
    </div>
    <div @click="leaveConversation" class="chat-header__button" v-if="!isDialogue">
      <v-icon class="chat-header__button__icon">logout</v-icon>
      <span class="chat-header__button__text">Leave conversation</span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentConversation() {
      return this.$store.state.conversation.current;
    },
    isDialogue() {
      return this.$store.getters["conversation/isDialogue"];
    },
    currentContactId() {
      if (this.isDialogue) {
        const foundContact = this.currentConversation.participants.find(
          participant =>
            participant._id !== this.$store.getters["user/getCurrentId"]
        );
        if (foundContact) {
          return foundContact._id;
        }
      }
      return null;
    },
    currentContactName() {
      return this.$store.getters["conversation/getParticipantName"](
        this.currentContactId
      );
    },
    conversationName() {
      return this.isDialogue
        ? this.currentContactName
        : this.currentConversation.title;
    },
    isContactOnline() {
      return this.$store.getters["person/isOnline"](this.currentContactId);
    },
    contactStatusText() {
      return this.isContactOnline ? "online" : "offline";
    }
  },
  methods: {
    leaveConversation() {
      this.$store.dispatch('conversation/leave', this.currentConversation._id);
    }
  }
};
</script>


<style lang="scss" scoped>
.chat-header {
  width: 100%;
  height: 60px;
  background: $color-purple-medium;
  padding: 0 15px;
  display: flex;
  align-items: center;
  &__title {
    color: rgba($color-purple-light, 0.7);
    margin-right: 10px;
  }
  &__button {
    display: flex;
    align-items: center;
    width: max-content;
    padding: 5px 10px;
    border: 1px solid rgba($color-purple-light, 0.2);
    cursor: pointer;
    transition: 0.3s;
    margin: 15px 0;
    margin-left: auto;
    &:hover & {
      &__icon,
      &__text {
        color: rgba($color-purple-light, 0.9);
      }
    }
    &__icon {
      color: rgba($color-purple-light, 0.7);
      margin-right: 10px;
      font-size: 18px;
    }

    &__text {
      color: rgba($color-purple-light, 0.7);
      font-size: 12px;
    }
  }
  &__contact-status {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: rgba($color-purple-light, 0.5);
    &__online-indicator {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: $color-purple-medium;
      border: 2px solid $color-purple-dark;
      margin-right: 5px;
      &--is-online {
        background: $color-green;
      }
    }
  }
}
</style>
