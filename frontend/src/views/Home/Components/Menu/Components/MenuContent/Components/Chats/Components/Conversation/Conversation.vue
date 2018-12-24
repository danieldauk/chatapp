<template>
  <div
    class="conversation"
    @click="loadConversation"
  >
    <div class="conversation__avatars">
      <img
        v-for="(participant, index) in shownParticipants"
        :key="participant._id"
        class="conversation__avatars__image"
        :src="avatarLink(participant.avatar)"
        :style="{left: avatarPosition(index)}"
      >
      <div
        v-if="remainingParticipants > 0"
        :style="{left: `${maxAvatars * 20}px`}"
        class="conversation__avatars__remaining"
      >
        +{{ remainingParticipants }}
      </div>
    </div>
    <div class="conversation__title">
      {{ conversation.title | truncateString(20) }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    conversation: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      maxAvatars: 4
    };
  },
  computed: {
    remainingParticipants() {
      return this.conversation.participants.length - this.maxAvatars;
    },
    shownParticipants() {
      return this.conversation.participants.slice(0, this.maxAvatars + 1);
    }
  },
  methods: {
    avatarPosition(index) {
      if (index === 0) {
        return '0px';
      }
      return `${index * 20}px`;
    },
    avatarLink(avatarFileName) {
      return `${process.env.VUE_APP_BASE_URL}/${avatarFileName}`;
    },
    async loadConversation() {
      if (this.$store.getters['conversation/getCurrentId'] === this.conversation._id) {
        return;
      }
      await this.$store.dispatch(
        'conversation/setCurrent',
        this.conversation
      );
      this.$store.dispatch('conversation/loadHistory', this.conversation._id);
    }
  }
};
</script>

<style lang="scss" scoped>
.conversation {
  display: grid;
  grid-template-columns: 5fr 5fr;
  height: 60px;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  width: 100%;
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  &__title {
    color: rgba($color-purple-light, 0.7);
  }
  &__avatars {
    display: flex;
    align-items: center;
    margin-right: 15px;
    position: relative;
    &__image {
      height: 35px;
      position: absolute;
      width: 35px;
      border-radius: 50%;
    }
    &__remaining {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      background: $color-silver;
      height: 35px;
      width: 35px;
      border-radius: 50%;
      color: $color-purple-dark;
    }
  }
}
</style>
