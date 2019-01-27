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
          token
        });
      } catch (error) {
        if (error.response) {
          await this.dispatch('signupForm/setError', {
            id: error.response.data.input || 'default',
            message: error.response.data.error
          });
        } else {
          await this.dispatch('signupForm/setError', {
            id: 'default',
            message: error.message
          });
        }
      }
      thisModule.dispatch('finishLoad');
    },
    async saveAvatar(thisModule, payload) {
      await thisModule.dispatch('startLoad');
      await thisModule.dispatch('clearErrors');
      try {
        const formData = new FormData();
        formData.append('avatar', payload, 'avatar.png');
        await axios.post('/api/avatars', formData, {
          headers: {
            Authorization: thisModule.state.current.token
          }
        });
      } catch (error) {
        if (error.response) {
          await this.dispatch('signup/setErrors', {
            error: error.response.data.error
          });
        } else {
          await this.dispatch('signup/setErrors', {
            error: error.message
          });
        }
      }
      thisModule.dispatch('finishLoad');
    }
  }
});
