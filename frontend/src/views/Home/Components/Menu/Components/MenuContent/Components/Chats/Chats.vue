<template>
  <div class="chats">
    <app-conversation
      v-for="conversation in conversations"
      :key="conversation._id"
      :conversation="conversation"
    />
  </div>
</template>

<script>
import Conversation from "./Components/Conversation/Conversation.vue";

export default {
  components: {
    appConversation: Conversation
  },
  computed: {
    conversations() {
      return this.$store.state.conversation.all;
    }
  }
};
</script>
