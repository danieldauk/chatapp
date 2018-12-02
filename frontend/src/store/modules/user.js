import AbstractStoreModule from '@/store/modules/AbstractStoreModule';

export default new AbstractStoreModule({
  getters: {
    getAvatarLink(state) {
      return state.current ? `${process.env.VUE_APP_BASE_URL}/${state.current.avatar}` : null;
    },
    getName(state) {
      return state.current ? state.current.username : null;
    }
  }
});
