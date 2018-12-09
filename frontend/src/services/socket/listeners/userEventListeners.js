import store from '@/store/store';
import { SocketEventsEnum } from '@/utils/enumerators';

export default (socket) => {
  socket.on(SocketEventsEnum.RESPONSE_USER_INFO, (data) => {
    // TODO: validate response using JSON schema
    store.dispatch('user/setCurrent', data);
  });
  socket.on(SocketEventsEnum.RESPONSE_FIND_PEOPLE, (data) => {
    store.dispatch('person/setAll', data);
  });
};
