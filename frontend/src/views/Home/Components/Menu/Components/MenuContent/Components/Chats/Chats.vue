<template>
  <div class="chats">
    <app-dialog />
    <app-conversation
      v-for="conversation in conversations"
      v-if="currentSearchTerm.test(conversation.title)"
      :key="conversation._id"
      :conversation="conversation"
    />
  </div>
</template>

<script>
import Conversation from './Components/Conversation/Conversation.vue';
import Dialog from './Components/Dialog/Dialog.vue';

export default {
  components: {
    appConversation: Conversation,
    appDialog: Dialog
  },
  computed: {
    conversations() {
      return this.$store.state.conversation.all.filter(conversation => {
        return (conversation.participants.length > 2) || (conversation.removedParticipants.length !== 0 &&conversation.participants.length >= 2);
      });
    },
    currentSearchTerm() {
      // TODO: add fuzzysort: https://github.com/farzher/fuzzysort
      const currentTerm = this.$options.filters.escapeRegexp(this.$store.state.searchForm.data.term);
      return new RegExp(currentTerm, 'i');
    }
  }
};
</script>

<style lang="scss" scoped>
  .chats {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
