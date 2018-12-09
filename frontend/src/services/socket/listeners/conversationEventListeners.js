import store from '@/store/store';
import { SocketEventsEnum } from '@/utils/enumerators';

export default (socket) => {
  socket.on(SocketEventsEnum.RESPONSE_CREATE_CONVERSATION, async (data) => {
    await store.dispatch('conversation/setCurrent', data);
    store.dispatch('conversation/loadHistory', store.getters['conversation/getCurrentId']);
  });
  socket.on(SocketEventsEnum.RESPONSE_CONVERSATIONS, (conversations) => {
    store.dispatch('conversation/setAll', conversations);
  });
};
