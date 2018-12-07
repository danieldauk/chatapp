<template>
  <div class="chat">
    <div class="chat__header">
      <slot name="header"/>
    </div>
    <div ref="body" class="chat__body">
      <slot name="body"/>
    </div>
    <div class="chat__footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    history() {
      return this.$store.state.conversation.history;
    }
  },
  watch: {
    history() {
      const element = this.$refs.body;
      this.$nextTick(() => {
        // TODO: check if user scrolled up to see history, if true - do not scroll to bottom on new message
        // TODO: if user scrolled up to see history and send message - scroll to bottom
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight;
        element.scroll({
          top: scrollHeight,
          left: 0
        });
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.chat {
  padding: 60px 0;
  background: $color-purple-light;
  height: 100%;
  position: relative;
  &__header {
    position: fixed;
    width: 100%;
    top: 0px;
    z-index: 1;
  }
  &__body {
    height: calc(100vh - 120px);
    overflow: auto;
    &::-webkit-scrollbar-track-piece {
      background: rgba(0, 0, 0, 0);
    }
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-button {
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      background: $color-purple-medium;
    }
  }
  &__footer {
    position: fixed;
    width: 100%;
    bottom: 0px;
    z-index: 1;
  }
}
</style>
