<template>
  <v-form
    class="message-form"
    @keydown.enter="submitForm"
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
      @input="setFormElementValue"
    />
    <!-- button is needed to submit autofocused input -->
    <button
      type="submit"
      style="display:none"
    />
    <app-emoji-picker
      class="message-form__emoji-picker"
      @click.native="$refs.input.focus()"
      @addEmoji="addEmoji"
    />
  </v-form>
</template>

<script>
import replaceEmoticonsWithEmojies from '@/utils/emojies/replaceEmoticonsWithEmojies';
import EmojiPicker from './Components/EmojiPicker.vue';

export default {
  components: {
    appEmojiPicker: EmojiPicker
  },
  computed: {
    message() {
      return this.$store.state.messageForm.data.message;
    },
    conversationId() {
      return this.$store.getters['conversation/getCurrentId'];
    }
  },
  watch: {
    conversationId() {
      this.$store.dispatch('messageForm/setValue', {
        value: '',
        id: 'message'
      });
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
    addEmoji(emoji) {
      this.$refs.input.focus();
      const messageWithAddedEmoji = `${this.message}${emoji}`;
      this.setFormElementValue(messageWithAddedEmoji);
    }
  }
};
</script>


<style lang="scss" scoped>
.message-form {
  position: relative;
  display: flex;
  align-items: center;
  &__emoji-picker {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 12px;
    border-left: 1px solid rgba($color-silver, 0.2);
    height: 60px;
  }
  &__input {
    /deep/ .v-input__slot {
      box-shadow: none !important;
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
