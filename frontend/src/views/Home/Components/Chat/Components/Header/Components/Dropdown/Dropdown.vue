<template>
  <v-menu transition="slide-y-transition" left offset-y content-class="dropdown">
    <v-icon class="dropdown__icon" slot="activator">more_horiz</v-icon>
    <div class="dropdown__content">
      <span 
      class="dropdown__content__button">Add participants</span>
      <span 
      @click="isParticipantListShown = true"
      class="dropdown__content__button">Show participants</span>
      <span @click="leaveConversation" class="dropdown__content__button">Leave conversation</span>
    </div>
    <app-participant-list v-model="isParticipantListShown"/>
  </v-menu>
</template>

<script>
import ParticipantList from "./Components/ParticipantList/ParticipantList.vue";

export default {
  components: {
    appParticipantList: ParticipantList
  },
  data(){
    return {
      isParticipantListShown: false
    }
  },
  computed: {
    currentConversation() {
      return this.$store.state.conversation.current;
    }
  },
  methods: {
    leaveConversation() {
      this.$store.dispatch("conversation/leave", this.currentConversation._id);
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

