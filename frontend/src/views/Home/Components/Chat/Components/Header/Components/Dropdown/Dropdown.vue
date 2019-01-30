<template>
  <v-menu transition="slide-y-transition" left offset-y content-class="dropdown">
    <v-icon slot="activator" class="dropdown__icon">more_horiz</v-icon>
    <div class="dropdown__content">
      <span
        v-if="!isDialogue"
        class="dropdown__content__button"
        @click="openAddParticipantDialog"
      >Add participants</span>
      <span
        v-if="!isDialogue"
        class="dropdown__content__button"
        @click="isParticipantListShown = true"
      >Show participants</span>
      <span
        v-if="!isDialogue"
        class="dropdown__content__button"
        @click="leaveConversation"
      >Leave conversation</span>
      <span
        v-if="isDialogue"
        class="dropdown__content__button"
        @click="removeContact"
      >Remove contact</span>
      <span class="dropdown__content__button" @click="closeCurrentChat">Close conversation</span>
    </div>
    <app-participant-list v-model="isParticipantListShown"/>
    <app-add-participants/>
  </v-menu>
</template>

<script>
import ParticipantList from "./Components/ParticipantList/ParticipantList.vue";
import AddParticipants from "./Components/AddParticipants/AddParticipants.vue";

export default {
  components: {
    appParticipantList: ParticipantList,
    appAddParticipants: AddParticipants
  },
  data() {
    return {
      isParticipantListShown: false
    };
  },
  computed: {
    currentConversation() {
      return this.$store.state.conversation.current;
    },
    isDialogue() {
      return this.$store.getters["conversation/isDialogue"];
    }
  },
  methods: {
    leaveConversation() {
      this.$store.dispatch("conversation/leave", this.currentConversation._id);
    },
    openAddParticipantDialog() {
      this.$store.dispatch("UI/openAddParticipantDialog");
    },
    removeContact() {
      const contactId = this.currentConversation.participants.find(
        participant =>
          participant._id !== this.$store.getters["user/getCurrentId"]
      )._id;
      this.$store.dispatch("conversation/clearHistory");
      this.$store.dispatch("conversation/clearCurrent");
      this.$store.dispatch("contact/remove", contactId);
    },
    closeCurrentChat() {
      this.$store.dispatch("conversation/clearCurrent");
      this.$store.dispatch("conversation/clearHistory");
      this.$store.dispatch("conversation/clearPaginationInfo");
    }
  }
};
</script>

<style lang="scss" scoped>
.dropdown {
  background: $color-white;
  box-shadow: none;
  border: 1px solid rgba($color-purple-dark, 0.5);
  &__icon {
    color: rgba($color-purple-light, 0.7);
  }
  &__content {
    &__button {
      padding: 5px 10px;
      width: 100%;
      font-size: 14px;
      display: block;
      color: $color-purple-dark;
      cursor: pointer;
      &:hover {
        background: rgba($color-purple-light, 0.5);
      }
      &:not(:last-child) {
        border-bottom: 1px solid rgba($color-purple-dark, 0.5);
      }
    }
  }
}
</style>
