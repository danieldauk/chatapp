<template>
  <div :class="['message', {'message--own': isOwnMessage}]">
    <div class="message__avatar">
      <img v-if="!isPreviousMessageOwn" :src="avatar">
    </div>
    <div class="message__container">
      <div
        v-if="!isPreviousMessageOwn"
        :class="['message__container__time', {'message__container__time--own': isOwnMessage}]"
      >{{ time }}</div>
      <div
        :class="['message__container__body', {'message__container__body--own': isOwnMessage},{'message__container__body--other': !isOwnMessage}, {'message__container__body--subsequent': isPreviousMessageOwn}]"
      >{{ message.content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true
    },
    isPreviousMessageOwn: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    isOwnMessage() {
      return this.message.sender === this.$store.state.user.current._id;
    },
    avatar() {
      if (this.isOwnMessage) {
        return this.$store.getters["user/getAvatarLink"];
      }
      return this.$store.getters["contact/getAvatarLink"](this.message.sender);
    },
    time() {
      return this.$options.filters.formatDate(this.message.createdAt, "HH:mm");
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
  &__avatar {
    display: flex;
    justify-content: center;
    min-width: 50px;
    img {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      display: block;
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    max-width: 50%;
    &__time {
      font-size: 10px;
      color: $color-silver;
      &--own {
        text-align: right;
      }
    }
    &__body {
      box-shadow: 0px 2px 5px 1px rgba($color-purple-ultra-dark, 0.2);
      font-size: 13px;
      padding: 5px 15px;
      height: max-content;
      border-radius: 0px 3px 3px 3px;
      position: relative;
      background: $color-white;
      color: $color-purple-medium;
      white-space: pre-wrap;
      word-break: break-all;
      word-break: break-word;
      &--other {
        &:after {
          content: "";
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
      }
      &--own {
        background: $color-blue-medium;
        color: $color-white;
        border-radius: 3px 0px 3px 3px;
        &:after {
          content: "";
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
      &--subsequent {
        &:after {
          content: none;
        }
      }
    }
  }
}
</style>
