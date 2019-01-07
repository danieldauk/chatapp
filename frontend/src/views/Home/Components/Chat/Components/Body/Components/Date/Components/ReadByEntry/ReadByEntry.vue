<template>
  <div class="read-by">
    <img
      v-for="participantId in participantList"
      :key="participantId"
      class="read-by__avatar"
      :src="getAvatarLink(participantId)"
      alt="avatar"
    >
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
  computed: {
    participantList() {
      return this.message.readBy.filter(participantId => {
        const isSelf =
          participantId === this.$store.getters["user/getCurrentId"];
        const isSender = participantId === this.message.sender;
        if (isSelf || isSender) {
          return false;
        }
        return true;
      });
    }
  },
  methods: {
    getAvatarLink(participantId) {
      return this.$store.getters["conversation/getParticipantAvatarLink"](
        participantId
      );
    }
  }
};
</script>



<style lang="scss" scoped>
.read-by {
  display: flex;
  align-items: center;
  &__avatar {
    height: 10px;
    width: 10px;
    object-fit: cover;
    border-radius: 50%;
  }
}
</style>
