import store from '@/store/store';
import { SocketEventsEnum } from '@/utils/enumerators';
import { sortMessages, transformMessage } from '@/utils/messages';

export default (socket) => {
  socket.on(SocketEventsEnum.RESPONSE_MESSAGES, async (data) => {
    await store.dispatch('conversation/setHistory', sortMessages(data));
  });
  socket.on(SocketEventsEnum.RECEIVE_MESSAGE, (message) => {
    store.dispatch('conversation/addMessageToHistory', transformMessage(message));
    store.dispatch('message/setLast', message);
    store.dispatch('message/setUnreadMessage', message);
  });
  socket.on(SocketEventsEnum.MESSAGES_READ, async (data) => {
    store.dispatch('conversation/setReadBy', data);
  });
};
