<template>
  <v-dialog
    :value="value"
    max-width="300px"
    content-class="participant-list"
    @input="$emit('input', false)"
  >
    <div class="participant-list__list">
      <app-participant
        v-for="participant in currentConversation.participants"
        :key="participant._id"
        class="participant-list__list__participant"
        :participant-id="participant._id"
      />
    </div>
  </v-dialog>
</template>

<script>
import Participant from './Components/Participant.vue';

export default {
  components: {
    appParticipant: Participant
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    currentConversation() {
      return this.$store.state.conversation.current;
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .participant-list {
  box-shadow: none;
  max-height: 400px;
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
  &__list {
    background: $color-white;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__participant {
      width: 100%;
      &:not(:last-child) {
        border-bottom: 1px solid $color-purple-light;
      }
    }
  }
}

@media (max-width: 665px) {
  /deep/ .participant-list {
    max-height: 380px;
  }
}
</style>
