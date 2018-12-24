<template>
  <div
    class="contact"
    @click="startConversation"
  >
    <div class="contact__avatar">
      <img
        class="contact__avatar__image"
        :src="imageLink"
      >
      <div
        :class="['contact__avatar__online-indicator', {'contact__avatar__online-indicator--is-online': isOnline}]"
      />
    </div>
    <div class="contact__name">
      {{ name | truncateString(20) }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
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
    }
  },
  methods: {
    async startConversation() {
      if (this.$store.getters['contact/getCurrentId'] === this.id) {
        return;
      }
      await this.$store.dispatch('contact/setCurrent', this.id);
      this.$store.dispatch('conversation/init', {
        participants: [
          this.id,
          this.$store.state.user.current._id
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.contact {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
  &__name {
    color: rgba($color-purple-light, 0.7);
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
      border: 2px solid $color-purple-dark;
      background: $color-purple-medium;
      &--is-online{
        background: $color-green;
      }
    }
    &__image {
      height: 35px;
      width: 35px;
      border-radius: 50%;
    }
  }
}
</style>
