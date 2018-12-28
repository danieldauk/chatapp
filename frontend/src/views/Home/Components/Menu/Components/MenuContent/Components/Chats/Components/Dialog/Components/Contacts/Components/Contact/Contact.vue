<template>
  <div class="contact">
    <div class="contact__info">
      <div class="contact__info__avatar">
        <img
          class="contact__info__avatar__image"
          :src="imageLink"
        >
        <div
          :class="['contact__info__avatar__online-indicator', {'contact__info__avatar__online-indicator--is-online': isOnline}]"
        />
      </div>
      <div class="contact__info__name">
        {{ name | truncateString(20) }}
      </div>
    </div>
    <div class="contact__checkbox">
      <v-checkbox
        :ripple="false"
        color="#2f2d51"
        hide-details
        :input-value="isChecked"
        @change="$emit('checkChange', $event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    conversationParticipants: {
      type: Array,
      required: true
    }
  },
  computed: {
    imageLink() {
      return this.$store.getters['contact/getAvatarLink'](this.id);
    },
    name() {
      return this.$store.getters['contact/getName'](this.id);
    },
    isOnline() {
      return this.$store.getters['person/isOnline'](this.id);
    },
    isChecked() {
      return this.conversationParticipants.includes(this.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.contact {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 10px;
  &__info {
    display: flex;
    align-items: center;
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
  &__checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    .v-input {
      margin: 0;
      padding: 0;
    }
    /deep/ .v-input--selection-controls__input {
      margin: 0;
    }
  }
}
</style>
