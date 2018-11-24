import AbstractStoreModule from '@/store/modules/AbstractStoreModule';
import socket from '@/services/socket/socket';

export default new AbstractStoreModule({
  actions: {
    init(thisModule, participants) {
      // TODO: emit socket event with participants 
    }
  }
});
