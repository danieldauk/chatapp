import { ActiveTabEnum } from '@/utils/enumerators';

export default {
  namespaced: true,
  state: {
    activeMenuTab: ActiveTabEnum.CONTACTS,
    currentSignUpStep: 1,
    isConversationCreationDialogOpen: false,
    isAddParticipantDialogOpen: false,
    isMenuOpen: false
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
    },
    openAddParticipantDialog(state) {
      state.isAddParticipantDialogOpen = true;
    },
    closeAddParticipantDialog(state) {
      state.isAddParticipantDialogOpen = false;
    },
    openMenu(state) {
      state.isMenuOpen = true;
    },
    closeMenu(state) {
      state.isMenuOpen = false;
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
    },
    openAddParticipantDialog(thisModule) {
      thisModule.commit('openAddParticipantDialog');
    },
    closeAddParticipantDialog(thisModule) {
      thisModule.commit('closeAddParticipantDialog');
    },
    openMenu(thisModule) {
      thisModule.commit('openMenu');
    },
    closeMenu(thisModule) {
      thisModule.commit('closeMenu');
    }
  }
};
