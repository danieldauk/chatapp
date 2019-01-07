<template>
  <div ref="body" class="chat-body">
    <app-date 
    v-for="date in history" 
    :key="date.date" 
    class="chat-body__date" 
    :date="date"
    :isLastDate="isLastDate(date.date)"
    :unreadMessagesEntryPosition="unreadMessagesEntryPosition" />
  </div>
</template>

<script>
import findIndex from 'lodash/findIndex';
import Date from "./Components/Date/Date.vue";

export default {
  components: {
    appDate: Date
  },
  data() {
    return {
      unsubscribeFromAction: null
    };
  },
  computed: {
    history() {
      return this.$store.state.conversation.history;
    },
    unreadMessagesEntryPosition() {
      let wasPositionFound = false;
      let unreadMessagesEntryPosition = "";
      if (this.history.length !== 0) {
        this.history.forEach(date => {
          if (wasPositionFound) {
            return;
          }
          date.messages.forEach(message => {
            if (wasPositionFound) {
              return;
            }
            if (!message.readBy.includes(this.$store.getters['user/getCurrentId'])) {
              wasPositionFound = true;
              unreadMessagesEntryPosition = message._id
            }
          });
        });
      }
      return unreadMessagesEntryPosition;
    }
  },
  mounted() {
    this.unsubscribeFromAction = this.$store.subscribeAction(action => {
      if (action.type === "conversation/setCurrent") {
        const currentConversationId = this.$store.getters[
          "conversation/getCurrentId"
        ];
        if (currentConversationId) {
          this.$store.dispatch("message/markAsRead", currentConversationId);
        }
      }
    });
  },
  updated() {
    const element = this.$refs.body;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    const lastDate =
      this.history.length !== 0 ? this.history[this.history.length - 1] : null;
    const lastMessage = lastDate
      ? lastDate.messages[lastDate.messages.length - 1]
      : null;

    // if user sent message
    // scroll to bottom of chat body
    if (
      lastMessage &&
      lastMessage.sender === this.$store.getters["user/getCurrentId"]
    ) {
      this.scrollTo(scrollHeight);
      return;
    }
    // if user scrolled up to see conversation history
    // and scroll height is more than half of chat body height
    // dont scroll to bottom on new message event
    if (
      scrollTop + clientHeight - scrollHeight <= -(clientHeight / 2) &&
      scrollTop !== 0
    ) {
      return;
    }

    this.scrollTo(scrollHeight);
  },
  destroyed() {
    this.unsubscribeFromAction();
  },
  methods: {
    scrollTo(position = 0) {
      this.$refs.body.scroll({
        top: position
      });
    },
    isLastDate(date) {
      if (this.history.length === 0) {
        return false;
      }
      const index = findIndex(this.history, currentDate => currentDate.date === date);
      return (this.history.length -1) === index;
    }
  }
};
</script>


<style lang="scss" scoped>
.chat-body {
  display: grid;
  grid-template-columns: 1fr repeat(12, minmax(30px, 70px)) 1fr;
  height: 100%;
  overflow-y: auto;
  padding: 0;
  &__date {
    grid-column: 2 / 14;
    &:not(:first-child) {
      margin-top: 10px;
    }
    &:first-child {
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
