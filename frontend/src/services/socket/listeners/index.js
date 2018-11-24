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
};
