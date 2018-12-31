import AbstractStoreModule from '@/store/modules/AbstractStoreModule';
import socket from '@/services/socket/socket';
import { SocketEventsEnum } from '@/utils/enumerators';

export default new AbstractStoreModule({
  state: {
    unread: []
  },
  getters: {
    getCurrentId(state) {
      return state.current ? state.current._id : null;
    }
  },
  actions: {
    send(thisModule, { content, conversationId }) {
      socket.emit(SocketEventsEnum.SEND_MESSAGE, {
        content,
        conversationId
      });
    }
  }
});
