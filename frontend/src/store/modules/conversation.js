import AbstractStoreModule from '@/store/modules/AbstractStoreModule';
import socket from '@/services/socket/socket';
import { SocketEventsEnum } from '@/utils/enumerators';

export default new AbstractStoreModule({
  state: {
    messages: []
  },
  getters: {
    getCurrentId(state) {
      return state.current ? state.current._id : null;
    }
  },
  mutations: {
    setMessages(state, messages) {
      state.messages = messages;
    }
  },
  actions: {
    init(thisModule, participants) {
      thisModule.dispatch('startLoad');
      socket.emit(SocketEventsEnum.REQUEST_CREATE_CONVERSATION, participants);
    },
    setMessages(thisModule, messages) {
      thisModule.commit('setMessages', messages);
    },
    loadMessages(thisModule, conversationdId) {
      socket.emit(SocketEventsEnum.REQUEST_MESSAGES, conversationdId);
    }
  }
});
