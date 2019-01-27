<template>
  <v-form
    ref="form"
    class="form"
    @submit.prevent="submitForm"
  >
    <div class="form__header">
      Create your account
    </div>
    <app-username class="form__input" />
    <app-password class="form__input" />
    <app-repeated-password class="form__input" />
    <app-form-error />
    <app-confirm class="form__button" />
    <div class="form__login">
      Already have an account?
      <router-link
        class="form__login__link"
        to="/login"
      >
        Login.
      </router-link>
    </div>
  </v-form>
</template>

<script>
import Username from './Components/Username.vue';
import Password from './Components/Password.vue';
import RepeatedPassword from './Components/RepeatedPassword.vue';
import FormError from './Components/FormError.vue';
import Confirm from './Components/Confirm.vue';

export default {
  components: {
    appUsername: Username,
    appPassword: Password,
    appRepeatedPassword: RepeatedPassword,
    appFormError: FormError,
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
      if (this.$store.state.signup.current) {
        await this.$store.dispatch('UI/setCurrentSignUpStep', 2);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  flex-grow: 1;
  padding: 20px 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &__header {
    color: rgba($color-purple-light, 0.7);
    font-size: 18px;
    margin-bottom: 30px;
    font-weight: 400;
  }
  &__button {
    flex: 0 1 auto;
    margin: 0;
    margin-top: auto;
  }
  &__login {
    font-size: 13px;
    color: $color-purple-light;
    margin-top: 5px;
    &__link {
      color: $color-blue-medium;
    }
  }
  &__input {
    flex: 0 1 auto;
    width: 100%;
    /deep/ input {
      color: $color-purple-light !important;
    }
    /deep/ .v-icon {
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
</style>
