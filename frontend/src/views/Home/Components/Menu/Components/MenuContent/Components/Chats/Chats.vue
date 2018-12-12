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
      return this.$store.state.conversation.all;
    },
    currentSearchTerm() {
      // TODO: add fuzzysort: https://github.com/farzher/fuzzysort
      const currentTerm = this.$store.state.searchForm.data.term;
      // escape 'escape' characters in string
      return new RegExp(currentTerm.replace(/\\/gi, "\\\\"), 'i');
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
