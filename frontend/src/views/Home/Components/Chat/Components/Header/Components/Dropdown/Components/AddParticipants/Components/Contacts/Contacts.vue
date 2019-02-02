<template>
  <div class="contacts">
    <v-expansion-panel class="contacts__panel">
      <v-expansion-panel-content :value="addedConversationParticipants.length !==0">
        <app-added-contacts :added-conversation-participants="addedConversationParticipants" />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <app-search @input="searchTerm = $event" />
    <div class="contacts__contacts-container">
      <app-contact
        v-for="contactInfo in contacts"
        v-if="currentSearchTerm.test(contactInfo.contact.username)"
        :id="contactInfo.contact._id"
        :key="contactInfo.contact._id"
        class="contacts__contacts-container__contact"
        :added-conversation-participants="addedConversationParticipants"
        @checkChange="onChangeHandler($event, contactInfo.contact._id)"
      />
    </div>
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
    addedConversationParticipants: {
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
      return this.$store.state.contact.all.filter((contactInfo) => {
        const participantsArray = [];
        this.currentConversation.participants.forEach((participant) => {
          participantsArray.push(participant._id);
        });
        return !participantsArray.includes(contactInfo.contact._id);
      });
    },
    currentConversation() {
      return this.$store.state.conversation.current;
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
        const contactIndex = this.addedConversationParticipants.indexOf(contactId);
        if (contactIndex === -1) {
          return;
        }
        this.addedConversationParticipants.splice(contactIndex, 1);
        return;
      }
      this.addedConversationParticipants.push(contactId);
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
  &__contacts-container {
    max-height: 200px;
    overflow-x: auto;
    box-shadow: none;
    border-bottom: 1px solid $color-purple-light;
    &::-webkit-scrollbar-track-piece {
      background: $color-white;
    }
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-button {
      display: none;
    }
    &::-webkit-scrollbar-thumb {
      background: $color-purple-medium;
    }
    &__contact {
      &:not(:last-child) {
        border-bottom: 1px solid $color-purple-light;
      }
    }
  }
}

@media (max-width: 665px) {
  .contacts {
    &__contacts-container {
    max-height: 150px;
    }
  }
}
</style>
