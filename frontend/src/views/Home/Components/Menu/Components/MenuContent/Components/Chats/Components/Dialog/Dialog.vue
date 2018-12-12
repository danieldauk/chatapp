<template>
  <v-dialog 
  max-width="300px"
  @input="onInputHandler"
  class="dialog">
    <app-button slot="activator" />
    <div class="dialog__content">
      <app-contacts :isDialogOpen="isDialogOpen" />
    </div>
  </v-dialog>
</template>

<script>
import Button from "./Components/Button/Button.vue";
import Contacts from "./Components/Contacts/Contacts.vue";

export default {
  components: {
    appButton: Button,
    appContacts: Contacts
  },
  data() {
    return {
      isDialogOpen: false
    }
  },
  methods: {
    onInputHandler(isDialogOpen) {
      this.isDialogOpen = isDialogOpen;
    }
  }
}
</script>

<style lang="scss" scoped>
  .dialog {
    /deep/ &__content {
      background: $color-white;
    }
  }
</style>
