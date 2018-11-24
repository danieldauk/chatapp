import AbstractStoreModule from '@/store/modules/AbstractStoreModule';
import socket from '@/services/socket/socket';

export default new AbstractStoreModule({
  getters: {
    getImageLink: state => id => `${process.env.VUE_APP_BASE_URL}/${state.all.find(contact => contact._id === id).avatar}`,
    getName: state => id => state.all.find(contact => contact._id === id).username
  }
});
