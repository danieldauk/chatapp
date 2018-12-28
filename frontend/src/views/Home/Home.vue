<template>
  <app-home>
    <app-menu slot="menu" />
    <app-chat slot="chat" />
    <app-global-error slot='error' />
  </app-home>
</template>

<script>
import Home from './Layout/Home.vue';
import Menu from './Components/Menu/Menu.vue';
import Chat from './Components/Chat/Chat.vue';
import GlobalError from './Components/GlobalError/GlobalError';

export default {
  components: {
    appHome: Home,
    appMenu: Menu,
    appChat: Chat,
    appGlobalError: GlobalError
  }
};
</script>
