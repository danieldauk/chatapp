<template>
  <v-form class="message-form" @submit.prevent="submitForm">
    <v-text-field
      class="message-form__input"
      solo
      :value="message"
      hide-details
      height="60"
      placeholder="Type something to send..."
      @input="setFormElementValue"
      append-icon="insert_emoticon"
    />
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
      if (!this.message) {
        return;
      }
      await this.$store.dispatch("message/send", {
        content: this.message,
        conversationId: this.$store.getters["conversation/getCurrentId"]
      });
      this.$store.dispatch("messageForm/reset");
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
