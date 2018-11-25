import { SocketEventsEnum } from '@/utils/enumerators';
import store from '@/store/store';

export default (socket) => {
  // user events
  socket.on(SocketEventsEnum.RESPONSE_USER_INFO, (data) => {
    // TODO: validate response using JSON schema
    store.dispatch('user/setCurrent', data);
  });
  socket.on(SocketEventsEnum.RESPONSE_CONTACTS, (data) => {
    store.dispatch('contact/setAll', data.contacts);
  });
  socket.on(SocketEventsEnum.RESPONSE_CREATE_CONVERSATION, async (data) => {
    await store.dispatch('conversation/setCurrent', data);
    store.dispatch('conversation/loadMessages', store.getters['conversation/getCurrentId']);
  });
  socket.on(SocketEventsEnum.RESPONSE_MESSAGES, async (data) => {
    await store.dispatch('conversation/setMessages', data);
    store.dispatch('conversation/finishLoad');
  });
};
