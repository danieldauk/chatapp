
import AbstractStoreModule from '@/store/modules/AbstractStoreModule';
import socket from '@/services/socket/socket';
import { SocketEventsEnum } from '@/utils/enumerators';

export default new AbstractStoreModule({
  state: {
    online: []
  },
  getters: {
    getAvatarLink: state => (id) => {
      if (state.all.length === 0) {
        return null;
      }
      const foundPerson = state.all.find(person => person._id === id);
      return foundPerson ? `${process.env.VUE_APP_BASE_URL}/${foundPerson.avatar}` : null;
    },
    getName: state => (id) => {
      if (state.all.length === 0) {
        return null;
      }
      const foundPerson = state.all.find(person => person._id === id);
      return foundPerson ? foundPerson.username : null;
    },
    isOnline: state => (id) => {
      if (!state.online.includes(id)) {
        return false;
      }
      return true;
    }
  },
  mutations: {
    setOnline(state, list) {
      state.online = list;
    }
  },
  actions: {
    search(thisModule, username) {
      socket.emit(SocketEventsEnum.REQUEST_FIND_PEOPLE, username);
    },
    setOnline(thisModule, list) {
      thisModule.commit('setOnline', list);
    }
  }
});
