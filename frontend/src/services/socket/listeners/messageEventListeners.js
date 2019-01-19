import store from '@/store/store';
import cloneDeep from 'lodash/cloneDeep';
import { SocketEventsEnum } from '@/utils/enumerators';
import { sortMessages, transformMessage } from '@/utils/messages';
import { mergeHistories } from '@/utils/conversations';

export default (socket) => {
  socket.on(SocketEventsEnum.RESPONSE_MESSAGES, async (data) => {
    await store.dispatch('conversation/setPaginationInfo', {
      hasNextPage: data.hasNextPage,
      currentPage: data.page,
      totalPages: data.totalPages
    });
    if (data.docs.length === 0) {
      return;
    }
    const currentHistory = store.state.conversation.history;
    await store.dispatch('conversation/setHistory', mergeHistories(cloneDeep(currentHistory), sortMessages(data.docs)));
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
