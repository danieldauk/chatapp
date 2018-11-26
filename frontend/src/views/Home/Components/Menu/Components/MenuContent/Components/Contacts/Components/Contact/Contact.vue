<template>
  <div
    :style="contactStyle"
    class="contact"
    @click="startConversation"
  >
    <div
      :style="avatarStyle"
      class="contact__avatar"
    >
      <img
        class="contact__avatar__image"
        :src="imageLink"
      >
    </div>
    <div
      v-if="!isMenuMinified"
      class="contact__name"
    >{{ name | truncateString(30) }}</div>
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
    isMenuMinified() {
      return this.$store.state.UI.isMenuMinified;
    },
    contactStyle() {
      return this.isMenuMinified ? {
        justifyContent: 'center'
      } : {
        justifyContent: 'flex-start'
      };
    },
    avatarStyle() {
      return this.isMenuMinified ? {
        marginRight: '0px'
      } : {
        justifyContent: '15px'
      };
    }
  },
  methods: {
    startConversation() {
      // TODO: block dispatching of action if current user's chat history is loaded.
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
  &:hover{
    background: rgba(255,255,255, 0.05);
  }
  &__name {
    color: $color-purple-light;
  }
  &__avatar {
    display: flex;
    align-items: center;
    margin-right: 15px;
    &__image {
      height: 35px;
      width: 35px;
      border-radius: 50%;
    }
  }
}
</style>
