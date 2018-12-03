<template>
  <div class="contacts">
    <app-person
      v-for="person in people"
      :person="person"
      :key="person._id"
    />
  </div>
</template>

<script>
import Person from './Components/Person/Person.vue';

export default {
  components: {
    appPerson: Person
  },
  computed: {
    people() {
      return this.$store.state.person.all;
    }
  },
  destroyed() {
    this.$store.dispatch('person/clearAll');
  }
};
</script>
