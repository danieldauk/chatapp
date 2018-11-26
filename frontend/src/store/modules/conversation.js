import AbstractStoreModule from '@/store/modules/AbstractStoreModule';
import socket from '@/services/socket/socket';
import { SocketEventsEnum } from '@/utils/enumerators';

export default new AbstractStoreModule({
  state: {
    history: []
  },
  getters: {
    getCurrentId(state) {
      return state.current ? state.current._id : null;
    }
  },
  mutations: {
    setHistory(state, messages) {
      state.history = messages;
    }
  },
  actions: {
    init(thisModule, participants) {
      thisModule.dispatch('startLoad');
      socket.emit(SocketEventsEnum.REQUEST_CREATE_CONVERSATION, participants);
    },
    setHistory(thisModule, history) {
      thisModule.commit('setHistory', history);
    },
    loadHistory(thisModule, conversationdId) {
      socket.emit(SocketEventsEnum.REQUEST_MESSAGES, conversationdId);
    }
  }
});
