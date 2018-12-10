<template>
  <div class="chat-footer">
    <app-form />
  </div>
</template>

<script>
import Form from './Form/Form.vue';

export default {
  components: {
    appForm: Form
  }
};
</script>


<style lang="scss" scoped>
  .chat-footer {
    height: 60px;
    background: $color-white;
  }
</style>
