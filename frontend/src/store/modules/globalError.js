import AbstractStoreModule from '@/store/modules/AbstractStoreModule';

export default new AbstractStoreModule({
  getters: {
    getCurrent(state) {
      return state.current ? state.current.error : null;
    }
  }
});
