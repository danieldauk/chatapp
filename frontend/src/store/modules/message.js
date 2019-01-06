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
    },
    getUnreadCount: state => (conversationId) => {
      const foundConversation = state.unread.find(conversation => conversation.conversationId === conversationId);
      if (foundConversation) {
        return foundConversation.unreadMessages || null;
      }
      return null;
    }
  },
  mutations: {
    setUnread(state, unreadMessages) {
      state.unread = unreadMessages;
    },
    clearUndread(state) {
      state.unread = [];
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
    },
    setUnread(thisModule, unreadMessages) {
      thisModule.commit('setUnread', unreadMessages);
    },
    markAsRead(thisModule, conversationId) {
      socket.emit(SocketEventsEnum.SET_MESSAGES_AS_READ, conversationId);
    },
    setUnreadMessage(thisModule, message) {
      if (message.conversationId === this.getters['conversation/getCurrentId']) {
        return;
      }
      const unreadMessages = thisModule.state.unread;
      const updatedUnreadMessages = unreadMessages.map((conversation) => {
        if (conversation.conversationId === message.conversationId) {
          return {
            conversationId: message.conversationId,
            unreadMessages: conversation.unreadMessages + 1
          };
        }
        return conversation;
      });
      thisModule.commit('setUnread', updatedUnreadMessages);
    },
    clearUnreadConversationMessages(thisModule, conversationId) {
      const unreadMessages = thisModule.state.unread;
      const updatedUnreadMessages = unreadMessages.map((conversation) => {
        if (conversation.conversationId === conversationId) {
          return {
            conversationId,
            unreadMessages: 0
          };
        }
        return conversation;
      });
      thisModule.commit('setUnread', updatedUnreadMessages);
    },
    clearUnread(thisModule) {
      thisModule.commit('clearUnread');
    }
  }
});
