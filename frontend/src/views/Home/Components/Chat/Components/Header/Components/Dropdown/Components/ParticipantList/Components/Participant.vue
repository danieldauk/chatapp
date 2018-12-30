<template>
  <div class="participant">
    <div class="participant__avatar">
      <img class="participant__avatar__image" :src="imageLink">
      <div
        :class="['participant__avatar__online-indicator', {'participant__avatar__online-indicator--is-online': isOnline}]"
      />
    </div>
    <div class="participant__name">{{ name | truncateString(20) }}</div>
  </div>
</template>

<script>
export default {
  props: {
    participantId: {
      type: String,
      required: true
    }
  },
  computed: {
    imageLink() {
      return this.$store.getters["conversation/getParticipantAvatarLink"](this.participantId);
    },
    name() {
      return this.$store.getters["conversation/getParticipantName"](this.participantId);
    },
    isOnline() {
      return this.$store.getters["person/isOnline"](this.participantId);
    }
  }
};
</script>

<style lang="scss" scoped>
.participant {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 10px;
  &__name {
    color: $color-purple-ultra-dark;
  }
  &__avatar {
    display: flex;
    align-items: center;
    margin-right: 15px;
    position: relative;
    &__online-indicator {
      position: absolute;
      top: 3px;
      right: 0;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid $color-white;
      background: $color-purple-medium;
      &--is-online {
        background: $color-green;
      }
    }
    &__image {
      height: 35px;
      width: 35px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
}
</style>
