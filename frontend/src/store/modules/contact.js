import AbstractStoreModule from '@/store/modules/AbstractStoreModule';
import socket from '@/services/socket/socket';
import { SocketEventsEnum } from '@/utils/enumerators';

export default new AbstractStoreModule({
  getters: {
    getAvatarLink: state => (id) => {
      if (state.all.length === 0) {
        return null;
      }
      const foundContact = state.all.find(contact => contact._id === id);
      return foundContact ? `${process.env.VUE_APP_BASE_URL}/${foundContact.avatar}` : null;
    },
    getName: state => (id) => {
      if (state.all.length === 0) {
        return null;
      }
      const foundContact = state.all.find(contact => contact._id === id);
      return foundContact ? foundContact.username : null;
    },
    getCurrentId(state) {
      return state.current ? state.current : null;
    }
  },
  actions: {
    add(thisModule, contactId) {
      socket.emit(SocketEventsEnum.REQUEST_ADD_CONTACT, contactId);
    },
    remove(thisModule, contactId) {
      socket.emit(SocketEventsEnum.REQUEST_REMOVE_CONTACT, contactId);
    },
    load() {
      socket.emit(SocketEventsEnum.REQUEST_CONTACTS);
    }
  }
});
