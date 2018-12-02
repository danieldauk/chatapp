
import AbstractStoreModule from '@/store/modules/AbstractStoreModule';
import socket from '@/services/socket/socket';
import { SocketEventsEnum } from '@/utils/enumerators';

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
  },
  actions: {
    search(thisModule, username) {
      socket.emit(SocketEventsEnum.REQUEST_FIND_PEOPLE, username);
    }
  }
});
