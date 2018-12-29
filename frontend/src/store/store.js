import Vue from 'vue';
import Vuex from 'vuex';

import loginForm from './modules/forms/loginForm';
import signupForm from './modules/forms/signupForm';
import messageForm from './modules/forms/messageForm';
import searchForm from './modules/forms/searchForm';
import login from './modules/auth/login';
import signup from './modules/auth/signup';
import user from './modules/user';
import contact from './modules/contact';
import conversation from './modules/conversation';
import message from './modules/message';
import person from './modules/person';
import globalError from './modules/globalError';
import UI from './modules/UI';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    loginForm,
    signupForm,
    messageForm,
    searchForm,
    login,
    signup,
    user,
    contact,
    conversation,
    message,
    person,
    globalError,
    UI
  }
});

export default store;

const initialStateCopy = JSON.parse(JSON.stringify(store.state));

export const resetAppState = () => {
  store.replaceState(JSON.parse(JSON.stringify(initialStateCopy)));
};
