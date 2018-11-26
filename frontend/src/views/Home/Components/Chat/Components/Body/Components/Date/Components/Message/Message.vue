<template>
  <div
    :class="['message', {'message--own': isOwnMessage}]"
  >
    <div class="message__info">
      <div class="message__info__avatar">
        <img :src="avatar">
      </div>
      <div class="message__info__time">
        {{ time }}
      </div>
    </div>
    <div
      :class="['message__body', {'message__body--own': isOwnMessage}]"
    >{{ message.content }}</div>
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
    isOwnMessage() {
      return this.message.sender === this.$store.state.user.current._id;
    },
    avatar() {
      if (this.isOwnMessage) {
        return this.$store.getters['user/getAvatarLink'];
      }
      return this.$store.getters['contact/getAvatarLink'](this.message.sender);
    },
    time() {
      return this.$options.filters.formatDate(this.message.createdAt, 'HH:mm');
    }
  }
};
</script>


<style lang="scss" scoped>
.message {
  display: flex;
  margin-top: 10px;
  &--own {
    flex-direction: row-reverse;
  }
  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: $color-silver;
    margin: 0px 15px;
    &__avatar {
      margin-bottom: 5px;
      img {
        height: 25px;
        width: 25px;
        border-radius: 50%;
        display: block;
      }
    }
    &__time {
      font-size: 10px;
    }
  }

  &__body {
    font-size: 13px;
    padding: 10px 15px;
    width: minmax(min-content, 90%);
    height: max-content;
    border-radius: 0px 3px 3px 3px;
    position: relative;
    background: $color-white;
    color: $color-purple-medium;
    &:not(.message__body--own):after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-right-color: $color-white;
      border-left: 0;
      border-top: 0;
      margin-left: -5px;
    }
    &--own {
      background: $color-blue-medium;
      color: $color-white;
      border-radius: 3px 0px 3px 3px;
      &:after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        width: 0;
        height: 0;
        border: 5px solid transparent;
        border-left-color: $color-blue-medium;
        border-right: 0;
        border-top: 0;
        margin-right: -5px;
      }
    }
  }
}
</style>
