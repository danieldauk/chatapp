<template>
  <div
    ref="body"
    class="chat-body"
  >
    <infinite-loading
      class="chat-body__infinite-scrolling"
    />
    <app-date
      v-for="date in history"
      :key="date.date"
      class="chat-body__date"
      :date="date"
      :is-last-date="isLastDate(date.date)"
      :unread-messages-entry-position="unreadMessagesEntryPosition"
    />
  </div>
</template>

<script>
import findIndex from 'lodash/findIndex';
import Date from './Components/Date/Date.vue';
import InfiniteLoading from './Components/InfiniteLoading/InfiniteLoading.vue';

export default {
  components: {
    appDate: Date,
    InfiniteLoading
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
      let unreadMessagesEntryPosition = '';
      if (this.history.length !== 0) {
        this.history.forEach((date) => {
          if (wasPositionFound) {
            return;
          }
          date.messages.forEach((message) => {
            if (wasPositionFound) {
              return;
            }
            if (
              !message.readBy.includes(this.$store.getters['user/getCurrentId'])
            ) {
              wasPositionFound = true;
              unreadMessagesEntryPosition = message._id;
            }
          });
        });
      }
      return unreadMessagesEntryPosition;
    }
  },
  mounted() {
    this.unsubscribeFromAction = this.$store.subscribeAction((action) => {
      if (action.type === 'conversation/setCurrent') {
        const currentConversationId = this.$store.getters[
          'conversation/getCurrentId'
        ];
        if (currentConversationId) {
          this.$store.dispatch('message/markAsRead', currentConversationId);
        }
      }
      if (action.type === 'message/send') {
        // if user sent message
        // scroll to bottom of chat body
        const element = this.$refs.body;
        const scrollHeight = element.scrollHeight;
        this.scrollTo(scrollHeight);
      }
    });
  },
  updated() {
    if (!this.$store.state.conversation.current) {
      return;
    }
    const element = this.$refs.body;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;
    // if user scrolled up to see conversation history
    // and scroll height is more than chat body height
    // dont scroll to bottom on new message event
    if (
      (scrollTop + clientHeight - scrollHeight <= -clientHeight) && scrollTop !== 0
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
      const index = findIndex(
        this.history,
        currentDate => currentDate.date === date
      );
      return this.history.length - 1 === index;
    }
  }
};
</script>


<style lang="scss" scoped>
.chat-body {
  display: grid;
  grid-template-columns: 1fr repeat(12, minmax(30px, 70px)) 1fr;
  grid-template-rows: max-content max-content;
  height: 100%;
  overflow-y: auto;
  overflow-anchor: none !important;
  padding: 0;
  &__infinite-scrolling {
    grid-column: 2 / 14;
    height: max-content;
  }
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
  @include custom-scrollbar;
}
</style>
