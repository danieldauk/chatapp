<template>
  <v-dialog max-width="300px" content-class="dialog" @input="onInputHandler">
    <app-button slot="activator"/>
    <div class="dialog__content">
      <app-chat-title @input="chatTitle = $event" :chatTitle="chatTitle"/>
      <app-contacts :conversation-participants="conversationParticipants"/>
      <div class="dialog__content__error-message">{{error}}</div>
      <v-btn
        @click="createConversation"
        depressed
        block
        color="success"
        class="dialog__content__button"
      >Create</v-btn>
    </div>
  </v-dialog>
</template>

<script>
import Button from "./Components/Button/Button.vue";
import Contacts from "./Components/Contacts/Contacts.vue";
import ChatTitle from "./Components/ChatTitle/ChatTitle.vue";

export default {
  components: {
    appButton: Button,
    appContacts: Contacts,
    appChatTitle: ChatTitle
  },
  data() {
    return {
      isDialogOpen: false,
      conversationParticipants: [],
      localError: null,
      chatTitle: ""
    };
  },
  computed: {
    error() {
      return this.$store.state.conversation.errors.error || this.localError;
    }
  },
  watch: {
    isDialogOpen(isDialogOpen) {
      if (!isDialogOpen) {
        this.conversationParticipants = [];
        this.chatTitle = "";
        this.clearErrors();
      }
    }
  },
  methods: {
    onInputHandler(isDialogOpen) {
      this.isDialogOpen = isDialogOpen;
    },
    clearErrors() {
      this.$store.dispatch("conversation/clearErrors");
      this.localError = "";
    },
    createConversation() {
      this.clearErrors();
      if (this.conversationParticipants.length < 2) {
        this.localError = "Conversation should contain at least 2 participants";
        return;
      }

      if (!/\w/gi.test(this.chatTitle)) {
        this.localError =
          "Convarsation title should contain alphanumerical values ([a-zA-Z0-9])";
        return;
      }
      this.$store.dispatch("conversation/init", {
        participants: [
          ...this.conversationParticipants,
          this.$store.getters["user/getCurrentId"]
        ],
        title: this.chatTitle
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .dialog {
  box-shadow: none;
  &::-webkit-scrollbar-track-piece {
    background: $color-white;
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
  &__content {
    background: $color-white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10px;
    &__error-message {
      width: 100%;
      padding: 4px 10px;
      min-height: 25px;
      text-align: center;
      color: $color-red;
      font-size: 12px;
    }
    &__button {
      flex-grow: 0;
      text-transform: none;
      margin: 0;
      height: 40px;
      min-height: 40px;
      width: calc(100% - 20px);
    }
  }
}
</style>
