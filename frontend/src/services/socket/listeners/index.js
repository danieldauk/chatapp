import { SocketEventsEnum } from '@/utils/enumerators';
import store from '@/store/store';

export default (socket) => {
  // user events
  socket.on(SocketEventsEnum.RESPONSE_USER_INFO, (data) => {
    store.dispatch('user/setCurrent', data);
  });
  socket.on(SocketEventsEnum.RESPONSE_USER_CONTACTS, (data) => {
    console.log(data);
  });
};
