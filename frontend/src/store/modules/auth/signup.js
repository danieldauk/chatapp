import axios from '@/services/axios';
import AbstractStoreModule from '@/store/modules/AbstractStoreModule';

export default new AbstractStoreModule({
  actions: {
    async init(thisModule, payload) {
      await thisModule.dispatch('startLoad');
      try {
        await axios.post('/api/users', payload);
      } catch (error) {
        if (error.response) {
          await this.dispatch('signupForm/setError', {
            id: error.response.data.input || 'password',
            message: error.response.data.error
          });
        }
      }
      thisModule.dispatch('finishLoad');
    }
  }
});
