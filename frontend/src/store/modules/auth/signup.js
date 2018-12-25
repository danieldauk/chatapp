import axios from '@/services/axios';
import AbstractStoreModule from '@/store/modules/AbstractStoreModule';

export default new AbstractStoreModule({
  actions: {
    async init(thisModule, payload) {
      await thisModule.dispatch('startLoad');
      try {
        await axios.post('/api/users', payload);
        const response = await axios.post('/api/auth/login', payload);
        const token = response.data.token;
        await thisModule.dispatch('setCurrent', {
          username: payload.username,
          password: payload.password,
          token
        });
      } catch (error) {
        if (error.response) {
          await this.dispatch('signupForm/setError', {
            id: error.response.data.input || 'password',
            message: error.response.data.error
          });
          return;
        }
        await this.dispatch('signupForm/setError', {
          id: 'password',
          message: error.message
        });
      }
      thisModule.dispatch('finishLoad');
    },
    async setAvatar(thisModule) {
      
    }
  }
});
