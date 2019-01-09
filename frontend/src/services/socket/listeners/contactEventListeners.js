import store from '@/store/store';
import { SocketEventsEnum } from '@/utils/enumerators';

export default (socket) => {
  socket.on(SocketEventsEnum.RESPONSE_CONTACTS, (data) => {
    store.dispatch('contact/setAll', data.contacts);
  });
  socket.on(SocketEventsEnum.RESPONSE_ADD_CONTACT, async () => {
    await store.dispatch('contact/load');
    store.dispatch('conversation/loadAll');
  });
  socket.on(SocketEventsEnum.RESPONSE_REMOVE_CONTACT, () => {
    store.dispatch('contact/load');
  });
};
