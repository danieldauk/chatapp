<template>
  <div class="contacts">
    <app-contact
      v-for="contact in contacts"
      v-if="currentSearchTerm.test(contact.username)"
      :id="contact._id"
      :key="contact._id"
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
      return this.$store.state.contact.all.sort(contact => (this.$store.getters['person/isOnline'](contact._id) ? -1 : 1));
    },
    currentSearchTerm() {
      // TODO: add fuzzysort: https://github.com/farzher/fuzzysort
      const currentTerm = this.$options.filters.escapeRegexp(this.$store.state.searchForm.data.term);
      return new RegExp(currentTerm, 'i');
    }
  }
};
</script>
