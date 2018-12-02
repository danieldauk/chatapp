export default {
  namespaced: true,
  state: {
    activeMenuTab: 0
  },
  mutations: {
    setActiveTab(state, tab) {
      state.activeMenuTab = tab;
    }
  },
  actions: {
    setActiveTab(thisModule, tab) {
      thisModule.commit('setActiveTab', tab);
    }
  }
};
