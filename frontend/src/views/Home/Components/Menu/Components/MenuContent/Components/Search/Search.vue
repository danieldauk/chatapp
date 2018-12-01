<template>
  <v-form @submit.prevent="submitForm" class="search-form">
    <v-text-field
      class="search-form__input"
      solo
      prepend-icon="search"
      :value="message"
      hide-details
      height="60"
      placeholder="Search"
      @input="setFormElementValue"
    ></v-text-field>
  </v-form>
</template>

<script>
export default {
  computed: {
    term() {
      return this.$store.state.searchForm.data.term;
    }
  },
  methods: {
    async submitForm() {
      // if(!this.message) {
      //   return;
      // }
      // await this.$store.dispatch('message/init', {
      //   content: this.message,
      //   conversationId: this.$store.getters['conversation/getCurrentId']
      //   });
      // this.$store.dispatch('messageForm/reset');
    },
    setFormElementValue(value) {
      this.$store.dispatch("searchForm/setValue", {
        value,
        id: "term"
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.search-form {
  padding: 0 15px;
  border-bottom: 1px solid rgba($color-silver, 0.3);
  &__input {
    /deep/ .v-input__prepend-outer {
      margin: 0;
      height: 60px;
      display: flex;
      align-items: center;
      .v-icon {
        color: rgba($color-purple-light, 0.7);
        font-size: 20px;
      }
    }
    /deep/ .v-input__slot {
      box-shadow: none !important;
      background: $color-purple-dark;
      input {
        font-size: 15px;
        background: transparent;
        color: $color-purple-light;
        &::placeholder {
          color: rgba($color-purple-light, 0.7);
        }
      }
    }
  }
}
</style>
