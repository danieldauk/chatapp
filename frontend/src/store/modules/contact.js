import AbstractStoreModule from '@/store/modules/AbstractStoreModule';
import socket from '@/services/socket/socket';
import { SocketEventsEnum } from '@/utils/enumerators';

export default new AbstractStoreModule({
  getters: {
    getAvatarLink: state => (id) => {
      if (state.all.length === 0) {
        return null;
      }
      const foundContactInfo = state.all.find(contactInfo => contactInfo.contact._id === id);
      return foundContactInfo ? `${process.env.VUE_APP_BASE_URL}/${foundContactInfo.contact.avatar}` : null;
    },
    getName: state => (id) => {
      if (state.all.length === 0) {
        return null;
      }
      const foundContactInfo = state.all.find(contactInfo => contactInfo.contact._id === id);
      return foundContactInfo ? foundContactInfo.contact.username : null;
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
