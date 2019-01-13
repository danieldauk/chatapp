<template>
  <v-form
    class="message-form"
    @submit.prevent="submitForm"
  >
    <v-text-field
      ref="input"
      class="message-form__input"
      solo
      :value="message"
      hide-details
      height="60"
      placeholder="Type something to send..."
      append-icon="insert_emoticon"
      :append-icon-cb="toggleEmojiPicker"
      @keydown.enter="submitForm"
      @input="setFormElementValue"
    />
    <app-emoji-picker
      v-if="isEmojiPickerShown"
      v-click-outside="closeEmojiPicker"
      @click="$refs.input.$el.focus()"
      @select="addEmoji"
    />
  </v-form>
</template>

<script>
import ClickOutside from 'vue-click-outside';
import replaceEmoticonsWithEmojies from '@/utils/replaceEmoticonsWithEmojies';
import EmojiPicker from './Components/EmojiPicker.vue';

export default {
  components: {
    appEmojiPicker: EmojiPicker
  },
  directives: {
    ClickOutside
  },
  data() {
    return {
      isEmojiPickerShown: false
    };
  },
  computed: {
    message() {
      return this.$store.state.messageForm.data.message;
    }
  },
  methods: {
    async submitForm() {
      if (!this.message) {
        return;
      }
      await this.$store.dispatch('message/send', {
        content: this.message,
        conversationId: this.$store.getters['conversation/getCurrentId']
      });
      this.$store.dispatch('messageForm/reset');
    },
    setFormElementValue(value) {
      const emojifiedMessage = replaceEmoticonsWithEmojies(value);
      this.$store.dispatch('messageForm/setValue', {
        value: emojifiedMessage,
        id: 'message'
      });
    },
    toggleEmojiPicker() {
      this.isEmojiPickerShown = !this.isEmojiPickerShown;
    },
    closeEmojiPicker() {
      this.isEmojiPickerShown = false;
    },
    addEmoji(emoji) {
      this.$refs.input.focus();
      const messageWithAddedEmoji = `${this.message}${emoji.native}`;
      this.setFormElementValue(messageWithAddedEmoji);
    }
  }
};
</script>


<style lang="scss" scoped>
.message-form {
  position: relative;
  &__input {
    /deep/ .v-input__slot {
      box-shadow: none !important;
      .v-input__append-inner {
        display: flex;
        align-items: center;
        padding-left: 12px;
        margin-left: 12px;
        height: 100%;
        border-left: 1px solid rgba($color-silver, 0.2);
        .v-icon {
          color: $color-silver !important;
          cursor: pointer;
        }
      }
      input {
        font-size: 15px;
        &::placeholder {
          color: $color-silver;
        }
      }
    }
  }
}
</style>
