import store from '@/store/store';
import { SocketEventsEnum } from '@/utils/enumerators';

export default (socket) => {
  socket.on(SocketEventsEnum.RESPONSE_CREATE_DIALOGUE, async (data) => {
    await store.dispatch('conversation/setCurrent', data);
    store.dispatch('conversation/loadHistory', store.getters['conversation/getCurrentId']);
  });
  socket.on(SocketEventsEnum.RESPONSE_CREATE_CONVERSATION, async (data) => {
    await store.dispatch('conversation/setCurrent', data);
    await store.dispatch('conversation/loadHistory', store.getters['conversation/getCurrentId']);
    await store.dispatch('conversation/loadAll');
    store.dispatch('UI/closeConversationCreationDialog');
  });
  socket.on(SocketEventsEnum.RESPONSE_LEAVE_CONVERSATION, async () => {
    await store.dispatch('conversation/clearCurrent');
    await store.dispatch('conversation/clearHistory');
    await store.dispatch('conversation/loadAll');
  });
  socket.on(SocketEventsEnum.PARTICIPANT_LEFT_CONVERSATION, async () => {
    await store.dispatch('conversation/loadAll');
  });
  socket.on(SocketEventsEnum.USER_ADDED_TO_CONVERSATION, async () => {
    await store.dispatch('conversation/loadAll');
  });
  socket.on(SocketEventsEnum.RESPONSE_CONVERSATIONS, (conversations) => {
    store.dispatch('conversation/setAll', conversations);
  });
};
