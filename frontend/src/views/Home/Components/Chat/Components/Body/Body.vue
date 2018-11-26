<template>
  <div class="chat-body">
    <app-date
      v-for="date in history"
      :key="date.date"
      :date="date"
    />
  </div>
</template>

<script>
import Date from './Components/Date/Date.vue';

export default {
  components: {
    appDate: Date
  },
  computed: {
    history() {
      console.log(this.$store.state.conversation.history);
      return this.$store.state.conversation.history;
    }
  }
};
</script>


<style lang="scss" scoped>
  .chat-body {
    display: flex;
    flex-direction: column;
  }
</style>
