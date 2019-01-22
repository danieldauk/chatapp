<template>
  <app-chat>
    <app-header
      v-if="doesCurrentConversationExist"
      slot="header"
    />
    <app-body v-if="doesCurrentConversationExist" slot="body" />
    <app-footer
      v-if="doesCurrentConversationExist"
      slot="footer"
    />
    <app-placeholder v-else slot="body" />
  </app-chat>
</template>

<script>
import Chat from './Layout/Chat.vue';
import Header from './Components/Header/Header.vue';
import Body from './Components/Body/Body.vue';
import Footer from './Components/Footer/Footer.vue';
import Placeholder from './Components/Placeholder/Placeholder.vue';

export default {
  components: {
    appChat: Chat,
    appHeader: Header,
    appBody: Body,
    appFooter: Footer,
    appPlaceholder: Placeholder
  },
  computed: {
    doesCurrentConversationExist() {
      return !!this.$store.state.conversation.current;
    }
  }
};
</script>


<style lang="scss" scoped>

</style>
