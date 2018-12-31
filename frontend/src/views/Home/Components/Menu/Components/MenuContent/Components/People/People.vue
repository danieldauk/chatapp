<template>
  <div>
    <app-person
      v-for="person in people"
      :key="person._id"
      :person="person"
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
