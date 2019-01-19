import AbstractStoreModule from '@/store/modules/AbstractStoreModule';
import socket from '@/services/socket/socket';
import cloneDeep from 'lodash/cloneDeep';
import { SocketEventsEnum } from '@/utils/enumerators';

export default new AbstractStoreModule({
  state: {
    history: [],
    currentPage: null,
    totalPages: null,
    hasNextPage: false,
    pageLimit: 100
  },
  getters: {
    getCurrentId(state) {
      return state.current ? state.current._id : null;
    },
    getById: state => (id) => {
      const foundConversation = state.all.find(conversation => conversation._id === id);
      return foundConversation || null;
    },
    getParticipantAvatarLink: state => (id) => {
      if (!state.current) {
        return null;
      }

      let foundParticipant = state.current.participants.find(participant => participant._id === id);
      if (!foundParticipant) {
        foundParticipant = state.current.removedParticipants.find(participant => participant._id === id);
      }
      return foundParticipant ? `${process.env.VUE_APP_BASE_URL}/${foundParticipant.avatar}` : null;
    },
    getParticipantName: state => (id) => {
      if (!state.current) {
        return null;
      }
      let foundParticipant = state.current.participants.find(participant => participant._id === id);
      if (!foundParticipant) {
        foundParticipant = state.current.removedParticipants.find(participant => participant._id === id);
      }
      return foundParticipant ? foundParticipant.username : null;
    },
    isDialogue(state) {
      if (state.current) {
        return state.current.participants.length === 2 && state.current.removedParticipants.length === 0;
      }
      return false;
    },
    doesParticipantExist: state => (id) => {
      if (!state.current) {
        return false;
      }
      const foundParticipant = state.current.participants.find(participant => participant._id === id);
      return !!foundParticipant;
    }
  },
  mutations: {
    setHistory(state, messages) {
      state.history = messages;
    },
    clearHistory(state) {
      state.history = [];
    },
    setPaginationInfo(state, { hasNextPage, currentPage, totalPages }) {
      state.hasNextPage = hasNextPage;
      state.currentPage = currentPage;
      state.totalPages = totalPages;
    }
  },
  actions: {
    loadAll() {
      socket.emit(SocketEventsEnum.REQUEST_CONVERSATIONS);
    },
    async setCurrent(thisModule, current) {
      await thisModule.dispatch('clearHistory');
      thisModule.commit('setCurrent', current);
    },
    init(thisModule, participants) {
      socket.emit(SocketEventsEnum.REQUEST_CREATE_CONVERSATION, participants);
    },
    addParticipants(thisModule, conversationData) {
      socket.emit(SocketEventsEnum.REQUEST_ADD_PARTICIPANTS, conversationData);
    },
    setHistory(thisModule, history) {
      thisModule.commit('setHistory', history);
    },
    loadHistory(thisModule, conversationId) {
      socket.emit(SocketEventsEnum.REQUEST_MESSAGES, {
        conversationId,
        page: 1,
        pageLimit: thisModule.state.pageLimit
      });
    },
    loadNextHistoryPage(thisModule, conversationId) {
      if (!thisModule.state.hasNextPage) {
        return;
      }
      socket.emit(SocketEventsEnum.REQUEST_MESSAGES, {
        conversationId,
        page: thisModule.state.currentPage + 1,
        pageLimit: thisModule.state.pageLimit
      });
    },
    clearHistory(thisModule) {
      thisModule.commit('clearHistory');
    },
    addMessageToHistory(thisModule, message) {
      if (message.message.conversationId !== this.getters['conversation/getCurrentId']) {
        return;
      }
      this.dispatch('message/markAsRead', this.getters['conversation/getCurrentId']);
      const newHistory = cloneDeep(thisModule.state.history);
      let wasMessageAdded = false;
      newHistory.forEach((date) => {
        if (date.date === message.date) {
          date.messages.push(message.message);
          wasMessageAdded = true;
        }
      });
      if (!wasMessageAdded) {
        newHistory.push({
          date: message.date,
          messages: [ message.message ]
        });
      }
      thisModule.dispatch('setHistory', newHistory);
    },
    setReadBy(thisModule, { userId, conversationId }) {
      if (thisModule.getters.getCurrentId !== conversationId) {
        return;
      }
      const currentHistory = thisModule.state.history;
      const updatedHistory = currentHistory.map((date) => {
        const updatedMessages = date.messages.map((message) => {
          if (!message.readBy.includes(userId)) {
            return {
              ...message,
              readBy: message.readBy.concat([ userId ])
            };
          }
          return message;
        });
        const updatedDate = {
          date: date.date,
          messages: updatedMessages
        };
        return updatedDate;
      });
      thisModule.commit('setHistory', updatedHistory);
    },
    leave(thisModule, conversationId) {
      socket.emit(SocketEventsEnum.REQUEST_LEAVE_CONVERSATION, conversationId);
    },
    setPaginationInfo(thisModule, paginationInfo) {
      thisModule.commit('setPaginationInfo', paginationInfo);
    }
  }
});
