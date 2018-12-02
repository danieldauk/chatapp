<template>
  <app-menu-content>
    <app-user-info slot="user-info"/>
    <app-tabs slot="tabs"/>
    <app-search slot="search"/>
    <app-toggle-button slot="toggle"/>
    <app-contacts 
    v-if="areContactsTabShown"
    slot="activeTabItem"/>
    <app-people
    v-if="arePeopleTabShown"
    slot="activeTabItem"/>
  </app-menu-content>
</template>

<script>
import { ActiveTabEnum } from "@/utils/enumerators";
import MenuContent from "./Layout/MenuContent.vue";
import UserInfo from "./Components/UserInfo/UserInfo.vue";
import Tabs from "./Components/Tabs/Tabs.vue";
import Search from "./Components/Search/Search.vue";
import Contacts from "./Components/Contacts/Contacts.vue";
import People from "./Components/People/People.vue";

export default {
  components: {
    appMenuContent: MenuContent,
    appUserInfo: UserInfo,
    appPeople: People,
    appContacts: Contacts,
    appTabs: Tabs,
    appSearch: Search
  },
  computed: {
    activeMenuTab() {
      return this.$store.state.UI.activeMenuTab;
    },
    areContactsTabShown() {
      return this.activeMenuTab === ActiveTabEnum.CONTACTS;
    },
    areChatsTabShown() {
      return this.activeMenuTab === ActiveTabEnum.CHATS;
    },
    areRequestsTabShown() {
      return this.activeMenuTab === ActiveTabEnum.REQUESTS;
    },
    arePeopleTabShown() {
      return this.activeMenuTab === ActiveTabEnum.PEOPLE;
    }
  }
};
</script>
