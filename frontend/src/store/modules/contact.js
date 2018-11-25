import AbstractStoreModule from '@/store/modules/AbstractStoreModule';
import socket from '@/services/socket/socket';

export default new AbstractStoreModule({
  getters: {
    getAvatarLink: state => (id) => {
      if (state.all.length === 0) {
        return null;
      }
      return `${process.env.VUE_APP_BASE_URL}/${state.all.find(contact => contact._id === id).avatar}`;
    },
    getName: state => (id) => {
      if (state.all.length === 0) {
        return null;
      }
      return state.all.find(contact => contact._id === id).username;
    }
  }
});
