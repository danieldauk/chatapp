<template>
  <v-dialog
    max-width="300px"
    content-class="dialog"
    :value="isDialogOpen"
    @keydown.enter="addParticipants"
    @input="onInputHandler"
  >
    <div class="dialog__content">
      <app-contacts :added-conversation-participants="addedConversationParticipants" />
      <div class="dialog__content__error-message">
        {{ error }}
      </div>
      <v-btn
        depressed
        block
        color="success"
        class="dialog__content__button"
        @click="addParticipants"
      >
        Add participants
      </v-btn>
    </div>
  </v-dialog>
</template>

<script>
import Contacts from './Components/Contacts/Contacts.vue';

export default {
  components: {
    appContacts: Contacts
  },
  data() {
    return {
      addedConversationParticipants: [],
      localError: null
    };
  },
  computed: {
    error() {
      return this.$store.state.conversation.errors.error || this.localError;
    },
    isDialogOpen() {
      return this.$store.state.UI.isAddParticipantDialogOpen;
    },
    currentConversation() {
      return this.$store.state.conversation.current;
    }
  },
  watch: {
    isDialogOpen(isDialogOpen) {
      if (!isDialogOpen) {
        this.addedConversationParticipants = [];
        this.clearErrors();
      }
    }
  },
  methods: {
    onInputHandler(isDialogOpen) {
      if (!isDialogOpen) {
        this.$store.dispatch('UI/closeAddParticipantDialog');
      }
    },
    clearErrors() {
      this.$store.dispatch('conversation/clearErrors');
      this.localError = '';
    },
    addParticipants() {
      this.clearErrors();
      if (this.addedConversationParticipants.length < 1) {
        this.localError = 'You should add at least 1 participant';
        return;
      }
      this.$store.dispatch('conversation/addParticipants', {
        participants: this.addedConversationParticipants,
        conversationId: this.currentConversation._id
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
