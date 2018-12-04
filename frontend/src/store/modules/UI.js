import { ActiveTabEnum } from '@/utils/enumerators';

export default {
  namespaced: true,
  state: {
    activeMenuTab: ActiveTabEnum.CONTACTS
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
