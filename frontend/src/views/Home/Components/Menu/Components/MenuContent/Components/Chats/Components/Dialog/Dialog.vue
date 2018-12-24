<template>
  <v-dialog
    max-width="300px"
    class="dialog"
    @input="onInputHandler"
  >
    <app-button slot="activator" />
    <div class="dialog__content">
      <app-contacts :is-dialog-open="isDialogOpen" />
    </div>
  </v-dialog>
</template>

<script>
import Button from './Components/Button/Button.vue';
import Contacts from './Components/Contacts/Contacts.vue';

export default {
  components: {
    appButton: Button,
    appContacts: Contacts
  },
  data() {
    return {
      isDialogOpen: false
    };
  },
  methods: {
    onInputHandler(isDialogOpen) {
      this.isDialogOpen = isDialogOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
  .dialog {
    /deep/ &__content {
      background: $color-white;
    }
  }
</style>
