<template>
  <infinite-loading
    ref="InfiniteLoading"
    :identifier="conversationId"
    direction="top"
    :distance="300"
    @infinite="loadNextPage"
  >
    <span slot="no-more" />
    <span slot="spinner" />
    <span slot="no-results" />
    <span slot="error" />
  </infinite-loading>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';

export default {
  components: {
    InfiniteLoading
  },
  data() {
    return {
      unsubscribeFromMutation: null
    };
  },
  computed: {
    conversationId() {
      return this.$store.getters['conversation/getCurrentId'];
    }
  },
  mounted() {
    this.unsubscribeFromMutation = this.$store.subscribe(
      (mutation, newState) => {
        if (mutation.type === 'conversation/setHistory') {
          if (newState.conversation.hasNextPage) {
            this.$refs.InfiniteLoading.stateChanger.loaded();
          }
        }
        if (mutation.type === 'conversation/setPaginationInfo') {
          if (!newState.conversation.hasNextPage) {
            this.$refs.InfiniteLoading.stateChanger.complete();
          }
        }
      }
    );
  },
  destroyed() {
    this.unsubscribeFromMutation();
  },
  methods: {
    loadNextPage($state) {
      if (!this.conversationId) {
        $state.error();
        return;
      }
      this.$store.dispatch(
        'conversation/loadNextHistoryPage',
        this.conversationId
      );
    }
  }
};
</script>
