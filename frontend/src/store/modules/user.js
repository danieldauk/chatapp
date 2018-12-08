import AbstractStoreModule from '@/store/modules/AbstractStoreModule';
import socket from '@/services/socket/socket';
import { SocketEventsEnum } from '@/utils/enumerators';

export default new AbstractStoreModule({
  getters: {
    getAvatarLink(state) {
      return state.current ? `${process.env.VUE_APP_BASE_URL}/${state.current.avatar}` : null;
    },
    getName(state) {
      return state.current ? state.current.username : null;
    },
    getCurrentId(state) {
      return state.current ? state.current._id : null;
    }
  },
  actions: {
    load() {
      socket.emit(SocketEventsEnum.REQUEST_USER_INFO);
    }
  }
});
