import jwt from 'jsonwebtoken';
import axios from '@/services/axios';
import { initSocket } from '@/services/socket/socket';
import AbstractStoreModule from '@/store/modules/AbstractStoreModule';

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
        // extract user id to send it during socket initialization
        // in order to create custom socketId
        const { _id: userId } = jwt.verify(token, process.env.VUE_APP_TOKEN_PUBLIC_KEY);
        await initSocket(token, userId);
      } catch (error) {
        await thisModule.dispatch('clearToken');
        // if token validation failed set error accordingly
        if (!error.response) {
          await this.dispatch('loginForm/setError', {
            id: 'default',
            message: error.message
          });
        } else {
          await this.dispatch('loginForm/setError', {
            id: error.response.data.input || 'default',
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
