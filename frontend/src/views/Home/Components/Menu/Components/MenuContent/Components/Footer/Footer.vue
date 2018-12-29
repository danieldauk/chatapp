<template>
  <div class="footer">
    <v-btn @click="logout" class="footer__button" flat icon :ripple="false">
      <v-icon class="footer__button__icon">logout</v-icon>
    </v-btn>
  </div>
</template>

<script>
import {resetAppState} from '@/store/store';
import socket from '@/services/socket/socket';

export default {
  methods: {
    async logout() {
      await this.$store.dispatch('login/clearToken');
      socket.close();
      socket.socket = null;
      await this.$router.replace('/login');
      resetAppState();
    }
  }
}
</script>


<style lang="scss" scoped>
  .footer {
    background: $color-blue-dark;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    &__button {
      margin: 0;
      margin-right: 7px;
      &::before {
        content: none;
      }
      &__icon {
        color: rgba($color-purple-light,0.7) !important;
      }
    }
  }
</style>

