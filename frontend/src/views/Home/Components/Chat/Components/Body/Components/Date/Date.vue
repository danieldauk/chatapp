<template>
  <div class="date">
    <div class="date__date">
      {{ date.date | formatDate('Do MMMM', true) }}
    </div>
    <div class="date__messages">
      <div
        v-for="(message, index) in date.messages"
        :key="message._id"
        class="date__messages__message-container"
      >
        <app-message
          v-if="message.sender"
          :message="message"
          :is-previous-message-own="index === 0 ? false : date.messages[index - 1].sender === message.sender"
        />
        <app-conversation-entry
          v-else
          :entry="message.content"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Message from './Components/Message/Message.vue';
import ConversationEntry from './Components/ConversationEntry/ConversationEntry.vue';

export default {
  components: {
    appConversationEntry: ConversationEntry,
    appMessage: Message
  },
  props: {
    date: {
      type: Object,
      required: true
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
