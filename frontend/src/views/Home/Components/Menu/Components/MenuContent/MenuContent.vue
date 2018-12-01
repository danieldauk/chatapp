<template>
  <app-menu-content>
    <app-user-info slot="user-info"/>
    <app-tabs slot="tabs"/>
    <app-toggle-button slot="toggle"/>
    <app-contacts slot="contacts"/>
  </app-menu-content>
</template>

<script>
import MenuContent from "./Layout/MenuContent.vue";
import UserInfo from "./Components/UserInfo/UserInfo.vue";
import Tabs from "./Components/Tabs/Tabs.vue";
import Contacts from "./Components/Contacts/Contacts.vue";

export default {
  components: {
    appMenuContent: MenuContent,
    appUserInfo: UserInfo,
    appContacts: Contacts,
    appTabs: Tabs
  }
};
</script>
