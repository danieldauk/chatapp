<template>
  <div
    ref="body"
    class="chat-body"
  >
    <app-date
      v-for="date in history"
      :key="date.date"
      class="chat-body__date"
      :date="date"
    />
  </div>
</template>

<script>
import Date from './Components/Date/Date.vue';

export default {
  components: {
    appDate: Date
  },
  computed: {
    history() {
      return this.$store.state.conversation.history;
    }
  },
  updated() {
    const element = this.$refs.body;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    const lastDate = this.history.length !== 0 ? this.history[this.history.length - 1] : null;
    const lastMessage = lastDate
      ? lastDate.messages[lastDate.messages.length - 1]
      : null;

    // if user sent message
    // scroll to bottom of chat body
    if (lastMessage && lastMessage.sender === this.$store.getters['user/getCurrentId']) {
      this.scrollTo(scrollHeight);
      return;
    }
    // if user scrolled up to see conversation history
    // and scroll height is more than half of chat body height
    // dont scroll to bottom on new message event
    if (
      scrollTop + clientHeight - scrollHeight <= -(clientHeight / 2)
      && scrollTop !== 0
    ) {
      return;
    }

    this.scrollTo(scrollHeight);
  },
  methods: {
    scrollTo(position = 0) {
      this.$refs.body.scroll({
        top: position
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.chat-body {
  display: flex;
  height: 100%;
  overflow-y: auto;
  flex-direction: column;
  padding: 0;
  &__date {
    &:not(:first-child) {
      margin-top: 10px;
    }
    &:first-child{
      padding-top: 20px;
    }
    &:last-child {
      padding-bottom: 20px;
    }
  }
  &::-webkit-scrollbar-track-piece {
    background: rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-button {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background: $color-purple-medium;
  }
}
</style>
