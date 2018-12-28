import { ActiveTabEnum } from '@/utils/enumerators';

export default {
  namespaced: true,
  state: {
    activeMenuTab: ActiveTabEnum.CONTACTS,
    currentSignUpStep: 1,
    isConversationCreationDialogOpen: false
  },
  mutations: {
    setActiveTab(state, tab) {
      state.activeMenuTab = tab;
    },
    setCurrentSignUpStep(state, step) {
      state.currentSignUpStep = step;
    },
    openConversationCreationDialog(state) {
      state.isConversationCreationDialogOpen = true;
    },
    closeConversationCreationDialog(state) {
      state.isConversationCreationDialogOpen = false;
    }
  },
  actions: {
    setActiveTab(thisModule, tab) {
      thisModule.commit('setActiveTab', tab);
    },
    setCurrentSignUpStep(thisModule, step) {
      thisModule.commit('setCurrentSignUpStep', step);
    },
    openConversationCreationDialog(thisModule) {
      thisModule.commit('openConversationCreationDialog');
    },
    closeConversationCreationDialog(thisModule) {
      thisModule.commit('closeConversationCreationDialog');
    }
  }
};
