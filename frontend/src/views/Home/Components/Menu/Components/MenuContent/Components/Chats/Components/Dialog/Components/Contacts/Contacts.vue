<template>
  <div class="contacts">
    <v-expansion-panel class="contacts__panel">
      <v-expansion-panel-content :value="conversationParticipants.length !==0">
        <app-added-contacts :conversation-participants="conversationParticipants" />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <app-search @input="searchTerm = $event" />
    <app-contact
      v-for="contact in contacts"
      v-if="currentSearchTerm.test(contact.username)"
      :id="contact._id"
      :key="contact._id"
      class="contacts__contact"
      :conversation-participants="conversationParticipants"
      @checkChange="onChangeHandler($event, contact._id)"
    />
  </div>
</template>

<script>
import Contact from './Components/Contact/Contact.vue';
import AddedContacts from './Components/AddedContacts/AddedContacts.vue';
import Search from './Components/Search/Search.vue';

export default {
  components: {
    appAddedContacts: AddedContacts,
    appContact: Contact,
    appSearch: Search
  },
  props: {
    conversationParticipants: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchTerm: null
    };
  },
  computed: {
    contacts() {
      return this.$store.state.contact.all;
    },
    currentSearchTerm() {
      if (!this.searchTerm) {
        return new RegExp('', 'i');
      }
      const escapedSearchTerm = this.$options.filters.escapeRegexp(
        this.searchTerm
      );
      return new RegExp(escapedSearchTerm, 'i');
    }
  },
  methods: {
    onChangeHandler(isChecked, contactId) {
      if (!isChecked) {
        const contactIndex = this.conversationParticipants.indexOf(contactId);
        if (contactIndex === -1) {
          return;
        }
        this.conversationParticipants.splice(contactIndex, 1);
        return;
      }
      this.conversationParticipants.push(contactId);
    }
  }
};
</script>

<style lang="scss" scoped>
.contacts {
  display: flex;
  flex-direction: column;
  width: 100%;
  &__panel {
    box-shadow: none;
  }
  &__contact {
    border-bottom: 1px solid $color-purple-light;
  }
}
</style>
