<template>
  <div class="date">
    <div class="date__date">{{ date.date | formatDate('Do MMMM', true) }}</div>
    <div class="date__messages">
      <div
        v-for="(message, index) in date.messages"
        :key="message._id"
        class="date__messages__message-container"
      >
        <app-unread-messages-entry 
        v-if="(unreadMessagesEntryPosition === message._id) && !wasHistoryUpdated"/>
        <app-message
          v-if="message.sender"
          :message="message"
          :is-previous-message-own="index === 0 ? false : date.messages[index - 1].sender === message.sender"
        />
        <app-read-by-entry
        :message="message"
        v-if="isLastMessage(message._id)" />
        <app-conversation-entry v-if="!message.sender" :entry="message.content"/>
      </div>
    </div>
  </div>
</template>

<script>
import findIndex from 'lodash/findIndex';
import Message from "./Components/Message/Message.vue";
import ConversationEntry from "./Components/ConversationEntry/ConversationEntry.vue";
import UnreadMessagesEntry from "./Components/UnreadMessagesEntry/UnreadMessagesEntry.vue";
import ReadByEntry from "./Components/ReadByEntry/ReadByEntry.vue";

export default {
  components: {
    appConversationEntry: ConversationEntry,
    appUnreadMessagesEntry: UnreadMessagesEntry,
    appReadByEntry: ReadByEntry,
    appMessage: Message
  },
  props: {
    date: {
      type: Object,
      required: true
    },
    unreadMessagesEntryPosition: {
      type: String,
      required: true
    },
    isLastDate: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      wasHistoryUpdated: false
    }
  },
  computed: {
    history() {
      return this.$store.state.conversation.history;
    }
  },
  watch: {
    history() {
      this.wasHistoryUpdated = true;
    }
  },
  methods: {
    isLastMessage(messageId) {
      if (!this.isLastDate) {
        return false;
      }
      if (this.date.messages.length === 0) {
        return false;
      }
      const index = findIndex(this.date.messages, currentMessage => currentMessage._id === messageId);
      return (this.date.messages.length -1) === index;
    }
  }
};
</script>

<style lang="scss" scoped>
.date {
  &__date {
    display: flex;
    justify-content: center;
    color: $color-silver;
    font-size: 12px;
  }
}
</style>
