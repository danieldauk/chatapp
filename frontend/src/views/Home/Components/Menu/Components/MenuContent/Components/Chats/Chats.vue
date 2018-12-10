<template>
  <div class="chats">
    <app-dialog />
    <app-conversation
      v-for="conversation in conversations"
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
