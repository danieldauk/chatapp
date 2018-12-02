<template>
  <div class="contacts">
    <app-person
      v-for="person in people"
      :id="person._id"
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
      return this.$store.state.people.all;
    }
  },
  destroyed() {
    this.$store.dispatch('people/clearAll');
  }
};
</script>
