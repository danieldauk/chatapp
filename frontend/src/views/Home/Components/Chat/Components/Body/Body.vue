<template>
  <div class="chat-body">
    <app-message 
    :message='message'
    :key='message._id'
    v-for='message in messages'/>
  </div>
</template>

<script>
import Message from './Components/Message/Message.vue';

export default {
  components: {
    appMessage: Message
  },
  computed: {
    messages() {
      return this.$store.state.conversation.messages;
    }
  }
}
</script>


<style lang="scss" scoped>
  .chat-body {
    display: flex;
    flex-direction: column;
  }
</style>
