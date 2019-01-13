<template>
  <picker
    class="picker"
    :include="['people']"
    :native="true"
    :skin="1"
    :per-line="8"
    :emoji-size="16"
    set="messenger"
    :show-skin-tones="false"
    :show-categories="false"
    :show-preview="false"
    :sheet-size="16"
    @select="$emit('select', $event)"
  />
</template>

<script>
import { Picker } from 'emoji-mart-vue';

export default {
  components: {
    Picker
  }
};
</script>

<style lang="scss" scoped>
.picker {
  position: absolute;
  bottom: 60px;
  right: 0;
  height: 200px !important;
  /deep/ .emoji-mart-search {
    input {
      font-size: 14px;
    }
  }
  /deep/ .emoji-mart-category-label {
    font-size: 14px;
  }
  /deep/ .emoji-mart-scroll {
    @include custom-scrollbar;
  }
}
</style>
