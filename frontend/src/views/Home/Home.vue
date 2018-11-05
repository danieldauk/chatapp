<template>
  <app-home>
    <app-contacts slot="contacts" />
    <app-chat slot="chat" />
  </app-home>
</template>

<script>
import Home from "./Layout/Home.vue";
import Contacts from "./Components/Contacts/Contacts.vue";
import Chat from "./Components/Chat/Chat.vue";

export default {
  components: {
    appHome: Home,
    appContacts: Contacts,
    appChat: Chat
  }
}
</script>

