<template>
  <div class="form">
    <div class="form__logo">
      <img src="@/assets/logo.svg">
    </div>
    <v-form
      ref="form"
      class="form__form"
      @submit.prevent="submitForm"
    >
      <app-username class="form__form__input" />
      <app-password class="form__form__input" />
      <app-form-error />
      <app-confirm class="form__form__button" />
    </v-form>
    <div class="form__signup">
      New to ChatApp?
      <router-link
        class="form__signup__link"
        to="/signup"
      >
        Create an account.
      </router-link>
    </div>
  </div>
</template>

<script>
import Username from './Components/Username.vue';
import Password from './Components/Password.vue';
import FormError from './Components/FormError.vue';
import Confirm from './Components/Confirm.vue';

export default {
  components: {
    appUsername: Username,
    appPassword: Password,
    appFormError: FormError,
    appConfirm: Confirm
  },
  destroyed() {
    this.$store.dispatch('loginForm/reset');
  },
  methods: {
    async submitForm() {
      if (!this.$refs.form.validate()) {
        return;
      }
      // clear server error messages on submit in order to clear manual error state
      await this.$store.dispatch('loginForm/clearErrors');
      await this.$store.dispatch('login/init', {
        username: this.$store.state.loginForm.data.username,
        password: this.$store.state.loginForm.data.password
      });
      if (this.$store.state.login.token) {
        this.$router.replace('/');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 300px;
  height: 500px;
  padding: 80px 20px 16px;
  background: rgba($color-purple-dark, 0.6);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__signup {
    font-size: 13px;
    color: $color-purple-light;
    margin-top: 5px;
    &__link {
      color: $color-blue-medium;
    }
  }
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
      position: absolute;
      bottom: 0;
    }
    &__input {
      flex: 0 1 auto;
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
}
</style>
