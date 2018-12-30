<template>
  <div class="entry">
    {{ entry }}
  </div>
</template>

<script>
export default {
  props: {
    entry: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
  .entry {
    font-size: 12px;
    padding: 5px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-purple-dark;
  }
</style>
