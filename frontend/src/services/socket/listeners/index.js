import { SocketEventsEnum } from '@/utils/enumerators';
import { sortMessages, transformMessage } from '@/utils/messages';
import store from '@/store/store';

export default (socket) => {
  // USER EVENTS
  socket.on(SocketEventsEnum.RESPONSE_USER_INFO, (data) => {
    // TODO: validate response using JSON schema
    store.dispatch('user/setCurrent', data);
  });
  // CONTACT EVENTS
  socket.on(SocketEventsEnum.RESPONSE_CONTACTS, (data) => {
    store.dispatch('contact/setAll', data.contacts);
  });
  // CONVERSATION EVENTS
  socket.on(SocketEventsEnum.RESPONSE_CREATE_CONVERSATION, async (data) => {
    await store.dispatch('conversation/setCurrent', data);
    store.dispatch('conversation/loadHistory', store.getters['conversation/getCurrentId']);
  });
  // MESSAGE EVENTS
  socket.on(SocketEventsEnum.RESPONSE_MESSAGES, async (data) => {
    await store.dispatch('conversation/setHistory', sortMessages(data));
    store.dispatch('conversation/finishLoad');
  });
  socket.on(SocketEventsEnum.RECEIVE_MESSAGE, (data) => {
    store.dispatch('conversation/addMessageToHistory', transformMessage(data));
  });
  // ERROR EVENT
  socket.on(SocketEventsEnum.ERROR, (error) => {
    console.error(error);
  });
};
