import store from '@/store/store';
import { SocketEventsEnum } from '@/utils/enumerators';
import { sortMessages, transformMessage } from '@/utils/messages';

export default (socket) => {
  socket.on(SocketEventsEnum.RESPONSE_MESSAGES, async (data) => {
    await store.dispatch('conversation/setHistory', sortMessages(data));
  });
  socket.on(SocketEventsEnum.RECEIVE_MESSAGE, (data) => {
    console.log(data);
    store.dispatch('conversation/addMessageToHistory', transformMessage(data));
  });
};
