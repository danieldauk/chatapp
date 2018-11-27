import Vue from 'vue';
import Vuex from 'vuex';

import loginForm from './modules/forms/loginForm';
import messageForm from './modules/forms/messageForm';
import login from './modules/auth/login';
import user from './modules/user';
import contact from './modules/contact';
import conversation from './modules/conversation';
import message from './modules/message';
import UI from './modules/UI';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    loginForm,
    messageForm,
    login,
    user,
    contact,
    conversation,
    message,
    UI
  }
});
