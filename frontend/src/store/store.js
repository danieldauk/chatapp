import Vue from 'vue';
import Vuex from 'vuex';

import loginForm from './modules/forms/loginForm';
import login from './modules/auth/login';
import user from './modules/user';
import contact from './modules/contact';
import conversation from './modules/conversation';
import UI from './modules/UI';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loginForm,
    login,
    user,
    contact,
    conversation,
    UI
  }
});
