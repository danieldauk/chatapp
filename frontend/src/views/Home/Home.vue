<template>
  <app-home>
    <app-mobile-header slot="header" />
    <app-menu slot="menu" />
    <app-chat slot="chat" />
  </app-home>
</template>

<script>
import Home from './Layout/Home.vue';
import Menu from './Components/Menu/Menu.vue';
import Chat from './Components/Chat/Chat.vue';
import MobileHeader from './Components/MobileHeader/MobileHeader.vue';

export default {
  components: {
    appHome: Home,
    appMenu: Menu,
    appChat: Chat,
    appMobileHeader: MobileHeader
  }
};
</script>
