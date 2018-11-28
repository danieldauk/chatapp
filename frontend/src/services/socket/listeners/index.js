import { SocketEventsEnum } from '@/utils/enumerators';
import sortMessages from '@/utils/sortMessages';
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
    store.dispatch('conversation/loadHistory', store.getters['conversation/getCurrentId']);
  });
  socket.on(SocketEventsEnum.RESPONSE_MESSAGES, async (data) => {
    await store.dispatch('conversation/setHistory', sortMessages(data));
    store.dispatch('conversation/finishLoad');
  });
  socket.on(SocketEventsEnum.RECEIVE_MESSAGE, (data) => {
    console.log(data);
  });
};
