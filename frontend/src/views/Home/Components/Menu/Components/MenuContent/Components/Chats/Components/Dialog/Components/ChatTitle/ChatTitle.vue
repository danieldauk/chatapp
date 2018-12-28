<template>
  <v-text-field
    class="chat-title"
    solo
    :value="chatTitle"
    maxlength="30"
    hide-details
    height="60"
    placeholder="Enter chat title"
    @input="emitValue"
  />
</template>

<script>
export default {
  props: {
    chatTitle: {
      type: String,
      required: true
    }
  },
  methods: {
    emitValue(value) {
      this.$emit('input', value);
    }
  }
};
</script>


<style lang="scss" scoped>
.chat-title {
  width: 100%;
  border-bottom: 1px solid rgba($color-silver, 0.3);
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
    padding-right: 0;
    input {
      font-size: 15px;
      background: transparent;
      color: $color-purple-medium;
      &::placeholder {
        color: rgba($color-purple-medium, 0.5);
      }
    }
  }
}
</style>
