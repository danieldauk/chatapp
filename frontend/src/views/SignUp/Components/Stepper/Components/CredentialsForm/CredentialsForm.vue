<template>
    <v-form
      ref="form"
      class="form__form"
      @submit.prevent="submitForm"
    >
      <app-username class="form__form__input" />
      <app-password class="form__form__input" />
      <app-confirm class="form__form__button" />
    </v-form>
</template>

<script>
import Username from './Components/Username.vue';
import Password from './Components/Password.vue';
import Confirm from './Components/Confirm.vue';

export default {
  components: {
    appUsername: Username,
    appPassword: Password,
    appConfirm: Confirm
  },
  destroyed() {
    this.$store.dispatch('signupForm/reset');
  },
  methods: {
    async submitForm() {
      if (!this.$refs.form.validate()) {
        return;
      }
      // clear server error messages on submit in order to clear manual error state
      await this.$store.dispatch('signupForm/clearErrors');
      await this.$store.dispatch('signup/init', {
        username: this.$store.state.signupForm.data.username,
        password: this.$store.state.signupForm.data.password
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 300px;
  height: 500px;
  padding: 80px 20px 40px;
  background: rgba($color-purple-dark, 0.6);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__logo {
    margin-bottom: 30px;
    img {
      height: 70px;
    }
  }
  &__form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    &__button {
      flex: 0 1 auto;
      bottom: 0;
    }
    &__input {
    flex: 0 1 auto;
    /deep/ input {
      color: $color-purple-light !important;
    }
    /deep/ .v-icon  {
      color: $color-purple-light;
      font-size: 18px;
    }
    /deep/ .v-input__slot::after,
    /deep/ .v-input__slot::before {
      border-color: $color-purple-light !important;
    }
    /deep/ .v-label {
      color: $color-purple-light;
    }
    &.error--text {
      /deep/ .v-input__slot::after,
      /deep/ .v-input__slot::before {
        border-color: $color-red !important;
      }
    }
  }
  }

}
</style>
