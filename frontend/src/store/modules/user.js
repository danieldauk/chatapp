import axios from '@/services/axios';
import AbstractStoreModule from '@/store/modules/AbstractStoreModule';

export default new AbstractStoreModule({
  actions: {
    async init(thisModule) {
      await thisModule.dispatch('startLoad');
      try {
        const response = await axios.get('/api/users/me');
        await thisModule.dispatch('setCurrent', response.data);
      } catch (error) {
        await thisModule.dispatch('setErrors', error.response);
      }
      thisModule.dispatch('finishLoad');
    }
  }
});
