<template>
  <div class="read-by">
    <div
      v-for="(participantId, index) in participantList"
      :key="participantId"
      class="read-by__avatar"
    >
      <img
        v-if="index < maxParticipantsAvatars"
        class="read-by__avatar__image"
        :src="getAvatarLink(participantId)"
        :alt="getParticipantName(participantId)"
      >
      <div
        v-if="index === maxParticipantsAvatars"
        class="read-by__avatar__remaining"
      >
        {{ remainingParticipants }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      maxParticipantsAvatars: 5
    };
  },
  computed: {
    participantList() {
      return this.message.readBy.filter((participantId) => {
        const isSelf = participantId === this.$store.getters['user/getCurrentId'];
        const isSender = participantId === this.message.sender;
        if (isSelf || isSender) {
          return false;
        }
        return true;
      });
    },
    remainingParticipants() {
      const participants = this.participantList.length;
      const remainingParticipants = participants - this.maxParticipantsAvatars;
      return `+${remainingParticipants}`;
    }
  },
  methods: {
    getAvatarLink(participantId) {
      return this.$store.getters['conversation/getParticipantAvatarLink'](
        participantId
      );
    },
    getParticipantName(participantId) {
      return this.$store.getters['conversation/getParticipantName'](participantId);
    }
  }
};
</script>


<style lang="scss" scoped>
.read-by {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  margin-top: 5px;
  &__avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    &:not(:last-child) {
      margin-left: 2px;
    }
    &__image {
      height: 15px;
      width: 15px;
      object-fit: cover;
      border-radius: 50%;
    }
    &__remaining {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 15px;
      width: 15px;
      border-radius: 50%;
      background: $color-silver;
      color: $color-purple-dark;
      font-size: 10px;
    }
  }
}
</style>
