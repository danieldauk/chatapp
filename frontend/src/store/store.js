import Vue from 'vue';
import Vuex from 'vuex';

import loginForm from './modules/forms/loginForm';
import login from './modules/auth/login';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loginForm,
    login,
    user
  }
});
