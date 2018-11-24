<template>
  <app-login>
    <app-form slot="form" />
  </app-login>
</template>

<script>
import Login from './Layout/Login.vue';
import Form from './Components/form/Form.vue';

export default {
  components: {
    appLogin: Login,
    appForm: Form
  }
};
</script>

<style lang="scss" scoped>

</style>
