<template>
  <v-menu transition="slide-y-transition" left offset-y content-class="dropdown">
    <v-icon class="dropdown__icon" slot="activator">more_horiz</v-icon>
    <div class="dropdown__content">
      <span @click="logout" class="dropdown__content__button">Log out</span>
    </div>
  </v-menu>
</template>

<script>
import { resetAppState } from "@/store/store";
import socket from "@/services/socket/socket";

export default {
  methods: {
    async logout() {
      await this.$store.dispatch("login/clearToken");
      socket.close();
      socket.socket = null;
      await this.$router.replace("/login");
      resetAppState();
    }
  }
};
</script>

<style lang="scss" scoped>
.dropdown {
  background: $color-white;
  box-shadow: none;
  border: 1px solid rgba($color-purple-dark, 0.5);
  &__icon {
    color: rgba($color-purple-light, 0.7);
  }
  &__content {
    &__button {
      padding: 5px 10px;
      font-size: 14px;
      display: block;
      color: $color-purple-dark;
      cursor: pointer;
      &:hover {
        background: rgba($color-purple-light, 0.5);
      }
      &:not(:last-child) {
        border-bottom: 1px solid rgba($color-purple-dark, 0.5);
      }
    }
  }
}
</style>

