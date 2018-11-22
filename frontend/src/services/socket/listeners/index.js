import { SocketEventsEnum } from '@/utils/enumerators';
import store from '@/store/store';

export default (socket) => {
  // user events
  socket.on(SocketEventsEnum.RESPONSE_USER_INFO, (data) => {
    console.log('response user info');
    store.dispatch('user/setCurrent', data);
  });
};
