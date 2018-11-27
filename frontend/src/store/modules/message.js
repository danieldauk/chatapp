import AbstractStoreModule from '@/store/modules/AbstractStoreModule';
import socket from '@/services/socket/socket';
import { SocketEventsEnum } from '@/utils/enumerators';

export default new AbstractStoreModule({
  getters: {
    getCurrentId(state) {
      return state.current ? state.current._id : null;
    }
  },
  actions: {
    init(thisModule, { message, conversationId }) {
      thisModule.dispatch('startLoad');
      socket.emit(SocketEventsEnum.SEND_MESSAGE, {
        message,
        conversationId
      });
    }
  }
});
