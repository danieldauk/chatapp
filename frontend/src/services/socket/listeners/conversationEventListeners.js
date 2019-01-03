import store from '@/store/store';
import { SocketEventsEnum } from '@/utils/enumerators';
import { sortConversations } from '@/utils/conversations';

export default (socket) => {
  socket.on(SocketEventsEnum.RESPONSE_CREATE_CONVERSATION, async (conversation) => {
    await store.dispatch('conversation/setCurrent', conversation);
    await store.dispatch('conversation/loadHistory', store.getters['conversation/getCurrentId']);
    await store.dispatch('conversation/loadAll');
    store.dispatch('UI/closeConversationCreationDialog');
  });
  socket.on(SocketEventsEnum.RESPONSE_LEAVE_CONVERSATION, async () => {
    await store.dispatch('conversation/clearCurrent');
    await store.dispatch('conversation/clearHistory');
    await store.dispatch('conversation/loadAll');
  });
  socket.on(SocketEventsEnum.RESPONSE_ADD_PARTICIPANTS, async (updatedConversation) => {
    await store.dispatch('conversation/setCurrent', updatedConversation);
    await store.dispatch('conversation/loadAll');
    store.dispatch('UI/closeAddParticipantDialog');
  });
  socket.on(SocketEventsEnum.PARTICIPANT_LEFT_CONVERSATION, async (updatedConversation) => {
    await store.dispatch('conversation/loadAll');
    if (store.getters['conversation/getCurrentId'] === updatedConversation._id) {
      await store.dispatch('conversation/setCurrent', updatedConversation);
    }
  });
  socket.on(SocketEventsEnum.PARTICIPANT_ADDED_TO_CONVERSAITON, async (updatedConversation) => {
    await store.dispatch('conversation/loadAll');
    if (store.getters['conversation/getCurrentId'] === updatedConversation._id) {
      await store.dispatch('conversation/setCurrent', updatedConversation);
    }
  });
  socket.on(SocketEventsEnum.USER_ADDED_TO_CONVERSATION, async () => {
    await store.dispatch('conversation/loadAll');
  });
  socket.on(SocketEventsEnum.RESPONSE_CONVERSATIONS, (conversations) => {
    const sortedConversations = sortConversations(conversations);
    store.dispatch('conversation/setAll', sortedConversations);
    const lastConversationMessages = [];
    sortedConversations.forEach((conversation) => {
      if (conversation.lastConversationMessage) {
        lastConversationMessages.push(conversation.lastConversationMessage);
      }
    });
    store.dispatch('message/setAll', lastConversationMessages);
  });
};
