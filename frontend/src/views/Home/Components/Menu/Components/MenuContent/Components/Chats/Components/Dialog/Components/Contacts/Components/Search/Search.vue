<template>
    <v-text-field
      class="search"
      solo
      clearable
      prepend-icon="search"
      hide-details
      height="60"
      placeholder="Search"
      @input="$emit('input', $event)"
    />
</template>

<script>
export default {

};
</script>


<style lang="scss" scoped>
.search {
  background: $color-purple-light;
  padding: 0 10px;
    /deep/ .v-input__prepend-outer {
      margin: 0;
      height: 60px;
      display: flex;
      align-items: center;
      .v-icon {
        color: rgba($color-purple-dark, 0.7) !important;
        font-size: 20px;
      }
    }
    /deep/ .v-input__slot {
      box-shadow: none !important;
      background: $color-purple-light;
      padding-right: 0;
      .v-input__icon--clear .v-icon {
        color: rgba($color-purple-dark, 0.7) !important;
        font-size: 18px;
      }
      input {
        font-size: 15px;
        background: transparent;
        color: $color-purple-dark;
        caret-color: $color-purple-dark;
        &::placeholder {
          color: rgba($color-purple-dark, 0.7);
        }
      }
    }
  }
</style>
