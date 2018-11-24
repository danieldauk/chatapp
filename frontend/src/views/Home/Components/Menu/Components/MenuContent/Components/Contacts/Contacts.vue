<template>
  <div class="contacts">
    <app-contact 
    v-for="contact in contacts"
    :key="contact._id"
    :id="contact._id"
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
      return this.$store.state.contact.all;
    }
  }
}
</script>
