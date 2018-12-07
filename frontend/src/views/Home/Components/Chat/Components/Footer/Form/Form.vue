<template>
  <v-form @submit.prevent="submitForm" class="message-form">
    <v-text-field
      class="message-form__input"
      solo
      :value="message"
      hide-details
      height="60"
      placeholder="Type something to send..."
      @input="setFormElementValue"
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  computed: {
    message() {
      return this.$store.state.messageForm.data.message;
    }
  },
  methods: {
    async submitForm() {
      if(!this.message) {
        return;
      }
      await this.$store.dispatch('message/send', {
        content: this.message,
        conversationId: this.$store.getters['conversation/getCurrentId']
        });
      this.$store.dispatch('messageForm/reset');
    },
    setFormElementValue(value) {
      this.$store.dispatch("messageForm/setValue", {
        value,
        id: "message"
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.message-form {
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
