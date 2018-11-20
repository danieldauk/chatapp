import jwt from 'jsonwebtoken';
import axios from '@/services/axios';
import { initSocket } from '@/services/socket/socket';
import AbstractStoreModule from '@/store/modules/AbstractStoreModule';
import router from '../../../router/router';

export default new AbstractStoreModule({
  state: {
    token: null
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
    }
  },
  actions: {
    async init(thisModule, payload) {
      await thisModule.dispatch('startLoad');
      try {
        const response = await axios.post('/api/auth/login', payload);
        const token = response.data.token;
        await thisModule.dispatch('setToken', token);
        localStorage.setItem('token', token);
        await initSocket(token);
        this.dispatch('user/init');
        await router.replace('/');
      } catch (error) {
        await thisModule.dispatch('clearToken');
        // if token validation failed set error accordingly
        if (error.message === 'invalidToken') {
          await thisModule.dispatch('setErrors', {
            error: error.message
          });
        } else {
          await this.dispatch('loginForm/setError', {
            id: 'password',
            message: error.response.data.error
          });
        }
      }
      thisModule.dispatch('finishLoad');
    },
    setToken(thisModule, token) {
      try {
        jwt.verify(token, process.env.VUE_APP_TOKEN_PUBLIC_KEY);
        thisModule.commit('setToken', token);
      } catch (error) {
        throw new Error('invalidToken');
      }
    },
    clearToken(thisModule) {
      thisModule.commit('clearToken');
      localStorage.removeItem('token');
    }
  }
});
