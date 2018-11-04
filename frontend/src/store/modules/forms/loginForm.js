/* eslint no-param-reassign: 0 */
const initialState = () => ({
  data: {
    username: '',
    password: ''
  },
  errors: {}
});

export default {
  namespaced: true,
  state: initialState(),
  getters: {
    hasError(state) {
      return Object.values(state.errors).some(hasError => !!hasError);
    },
    getError: state => field => state.errors[field] || null
  },
  mutations: {
    setValue(state, { id, value }) {
      state.data[id] = value;
    },
    setValues(state, data) {
      Object.keys(data).forEach((id) => {
        state.data[id] = data[id];
      });
    },
    setErrors(state, errors) {
      state.errors = errors;
    },
    clearError(state, id) {
      state.errors[id] = null;
    },
    clearErrors(state) {
      state.errors = {};
    },
    reset(state) {
      // acquire initial state and assign it's values to current state
      const clearedState = initialState();
      Object.keys(clearedState).forEach((key) => {
        state[key] = clearedState[key];
      });
    }
  },
  actions: {
    setValue(thisModule, data) {
      thisModule.commit('setValue', data);
    },
    setError(thisModule, { id, message }) {
      const errors = {
        ...thisModule.state.errors
      };
      errors[id] = message;
      thisModule.commit('setErrors', errors);
    },
    setErrors(thisModule, errors) {
      thisModule.commit('setErrors', errors);
    },
    clearError(thisModule, errorKey) {
      if (thisModule.state.errors[errorKey]) {
        thisModule.commit('clearError', errorKey);
      }
    },
    clearErrors(thisModule) {
      thisModule.commit('clearErrors');
    },
    setValues(thisModule, data) {
      thisModule.commit('setValues', data);
    },
    reset(thisModule) {
      thisModule.commit('reset');
    }
  }
};
