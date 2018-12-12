<template>
  <app-menu-content>
    <app-user-info slot="user-info" />
    <app-tabs slot="tabs" />
    <app-search slot="search" />
    <app-toggle-button slot="toggle" />
    <app-contacts
      v-if="isContactsTabShown"
      slot="activeTabItem"
    />
    <app-people
      v-if="isPeopleTabShown"
      slot="activeTabItem"
    />
    <app-chats
      v-if="isChatsTabShown"
      slot="activeTabItem"
    />
  </app-menu-content>
</template>

<script>
import { ActiveTabEnum } from '@/utils/enumerators';
import MenuContent from './Layout/MenuContent.vue';
import UserInfo from './Components/UserInfo/UserInfo.vue';
import Tabs from './Components/Tabs/Tabs.vue';
import Search from './Components/Search/Search.vue';
import Contacts from './Components/Contacts/Contacts.vue';
import People from './Components/People/People.vue';
import Chats from './Components/Chats/Chats.vue';

export default {
  components: {
    appMenuContent: MenuContent,
    appUserInfo: UserInfo,
    appPeople: People,
    appContacts: Contacts,
    appChats: Chats,
    appTabs: Tabs,
    appSearch: Search
  },
  computed: {
    activeMenuTab() {
      return this.$store.state.UI.activeMenuTab;
    },
    isContactsTabShown() {
      return this.activeMenuTab === ActiveTabEnum.CONTACTS;
    },
    isChatsTabShown() {
      return this.activeMenuTab === ActiveTabEnum.CHATS;
    },
    isPeopleTabShown() {
      return this.activeMenuTab === ActiveTabEnum.PEOPLE;
    }
  }
};
</script>
