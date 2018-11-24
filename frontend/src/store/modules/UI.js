export default {
  namespaced: true,
  state: {
    isMenuMinified: false
  },
  mutations: {
    minifyMenu(state) {
      state.isMenuMinified = true;
    },
    maxifyMenu(state) {
      state.isMenuMinified = false;
    }
  },
  actions: {
    minifyMenu(thisModule) {
      thisModule.commit('minifyMenu');
    },
    maxifyMenu(thisModule) {
      thisModule.commit('maxifyMenu');
    }
  }
};
