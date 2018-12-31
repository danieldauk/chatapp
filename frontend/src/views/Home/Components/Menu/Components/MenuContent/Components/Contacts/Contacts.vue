<template>
  <div class="contacts">
    <app-contact
      v-for="contactInfo in contacts"
      v-if="currentSearchTerm.test(contactInfo.contact.username)"
      :id="contactInfo.contact._id"
      :key="contactInfo.contact._id"
    />
  </div>
</template>

<script>
import Contact from './Components/Contact/Contact.vue';

export default {
  components: {
    appContact: Contact
  },
  computed: {
    contacts() {
      return this.$store.state.contact.all.sort(contactInfo => (this.$store.getters['person/isOnline'](contactInfo.contact._id) ? -1 : 1));
    },
    currentSearchTerm() {
      // TODO: add fuzzysort: https://github.com/farzher/fuzzysort
      const currentTerm = this.$options.filters.escapeRegexp(this.$store.state.searchForm.data.term);
      return new RegExp(currentTerm, 'i');
    }
  }
};
</script>
