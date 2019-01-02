import AbstractStoreModule from '@/store/modules/AbstractStoreModule';
import socket from '@/services/socket/socket';
import cloneDeep from 'lodash/cloneDeep';
import { SocketEventsEnum } from '@/utils/enumerators';

export default new AbstractStoreModule({
  state: {
    history: []
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
        return (state.current.participants.length === 2) && (state.current.removedParticipants.length === 0);
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
    }
  },
  actions: {
    loadAll() {
      socket.emit(SocketEventsEnum.REQUEST_CONVERSATIONS);
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
    loadHistory(thisModule, conversationdId) {
      socket.emit(SocketEventsEnum.REQUEST_MESSAGES, conversationdId);
    },
    clearHistory(thisModule) {
      thisModule.commit('clearHistory');
    },
    addMessageToHistory(thisModule, message) {
      if (message.message.conversationId !== this.getters['conversation/getCurrentId']) {
        return;
      }
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
    leave(thisModule, conversationId) {
      socket.emit(SocketEventsEnum.REQUEST_LEAVE_CONVERSATION, conversationId);
    }
  }
});
