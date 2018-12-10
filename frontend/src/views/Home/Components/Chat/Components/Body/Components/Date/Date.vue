<template>
  <div class="date">
    <div class="date__date">
      {{ date.date | formatDate('Do MMMM', true) }}
    </div>
    <div class="date__messages">
      <app-message
        v-for="(message, index) in date.messages"
        :key="message._id"
        :message="message"
        :is-previous-message-own="index === 0 ? false : date.messages[index - 1].sender === message.sender"
      />
    </div>
  </div>
</template>

<script>
import Message from './Components/Message/Message.vue';

export default {
  components: {
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
