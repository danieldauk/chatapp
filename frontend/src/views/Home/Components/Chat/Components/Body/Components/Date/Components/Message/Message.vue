<template>
  <div :class="['message', {'message--own': isOwnMessage}, {'message--is-last': isLastMessage}]">
    <div class="message__avatar">
      <img
        v-if="!isPreviousMessageOwn"
        :src="avatar"
      >
    </div>
    <div class="message__container">
      <div
        v-if="!isPreviousMessageOwn"
        :class="['message__container__info', {'message__container__info--own': isOwnMessage}]"
      >
        <span
          v-if="!isDialogue && !isOwnMessage"
          class="message__container__info--name"
        >
          {{ participantName }},
        </span>
        <span class="message__container__info--time">
          {{ time }}
        </span>
      </div>
      <div
        :class="['message__container__body', {'message__container__body--own': isOwnMessage},{'message__container__body--other': !isOwnMessage}, {'message__container__body--subsequent': isPreviousMessageOwn}]"
      >
        {{ message.content }}
      </div>
      <div
        :class="['message__container__read-by', {'message__container__read-by--own': isOwnMessage}]"
      >
        <app-read-by-entry
          v-if="isLastMessage"
          :message="message"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ReadByEntry from './Components/ReadByEntry/ReadByEntry.vue';

export default {
  components: {
    appReadByEntry: ReadByEntry
  },
  props: {
    message: {
      type: Object,
      required: true
    },
    isPreviousMessageOwn: {
      type: Boolean,
      required: true
    },
    isLastMessage: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    isOwnMessage() {
      return this.message.sender === this.$store.state.user.current._id;
    },
    avatar() {
      return this.$store.getters['conversation/getParticipantAvatarLink'](
        this.message.sender
      );
    },
    isDialogue() {
      return this.$store.getters['conversation/isDialogue'];
    },
    participantName() {
      return this.$store.getters['conversation/getParticipantName'](
        this.message.sender
      );
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
  &--is-last {
    margin-bottom: 15px;
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
      object-fit: cover;
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    max-width: 50%;
    position: relative;
    &__read-by {
      position: absolute;
      top: 100%;
      left: 0;
      &--own {
        right: 0;
      }
    }
    &__info {
      font-size: 10px;
      color: $color-silver;
      &--own {
        text-align: right;
      }
    }
    &__body {
      box-shadow: 0px 2px 5px 1px rgba($color-purple-ultra-dark, 0.2);
      line-height: 1.2;
      font-size: 13px;
      padding: 5px 15px;
      height: max-content;
      border-radius: 0px 3px 3px 3px;
      position: relative;
      background: $color-white;
      color: $color-purple-medium;
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
