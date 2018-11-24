<template>
  <app-menu-content>
    <app-user-info
      v-if="!isMenuMinified"
      slot="user-info"
    />
    <app-toggle-button slot="toggle" />
    <app-contacts slot="contacts" />
  </app-menu-content>
</template>

<script>
import MenuContent from './Layout/MenuContent.vue';
import UserInfo from './Components/UserInfo/UserInfo.vue';
import Contacts from './Components/Contacts/Contacts.vue';
import ToggleButton from './Components/ToggleButton/ToggleButton.vue';

export default {
  components: {
    appMenuContent: MenuContent,
    appToggleButton: ToggleButton,
    appUserInfo: UserInfo,
    appContacts: Contacts
  },
  computed: {
    isMenuMinified() {
      return this.$store.state.UI.isMenuMinified;
    }
  }
};
</script>
