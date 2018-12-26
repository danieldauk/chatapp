import { ActiveTabEnum } from '@/utils/enumerators';

export default {
  namespaced: true,
  state: {
    activeMenuTab: ActiveTabEnum.CONTACTS,
    currentSignUpStep: 1
  },
  mutations: {
    setActiveTab(state, tab) {
      state.activeMenuTab = tab;
    },
    setCurrentSignUpStep(state, step) {
      state.currentSignUpStep = step;
    }
  },
  actions: {
    setActiveTab(thisModule, tab) {
      thisModule.commit('setActiveTab', tab);
    },
    setCurrentSignUpStep(thisModule, step) {
      thisModule.commit('setCurrentSignUpStep', step);
    }
  }
};
