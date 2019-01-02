import AbstractStoreModule from '@/store/modules/AbstractStoreModule';
import socket from '@/services/socket/socket';
import { SocketEventsEnum } from '@/utils/enumerators';

export default new AbstractStoreModule({
  state: {
    unread: []
  },
  getters: {
    getLast: state => (conversationId) => {
      const foundMessage = state.all.find(message => message.conversationId === conversationId);
      if (foundMessage) {
        return foundMessage.content;
      }
      return null;
    }
  },
  actions: {
    send(thisModule, { content, conversationId }) {
      socket.emit(SocketEventsEnum.SEND_MESSAGE, {
        content,
        conversationId
      });
    },
    setLast(thisModule, newMessage) {
      const updatedMessages = thisModule.state.all.map((message) => {
        if (message.conversationId === newMessage.conversationId) {
          return newMessage;
        }
        return message;
      });
      thisModule.commit('setAll', updatedMessages);
    }
  }
});
