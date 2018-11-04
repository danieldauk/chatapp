/* eslint no-shadow: 0 */

export default class AbstractStoreModule {
  constructor({ state = {}, getters = {}, mutations = {}, actions = {} }) {
    const initialState = {
      isLoading: false,
      current: null,
      all: [],
      errors: {}
    };
    // check argument

    const getInitialState = () => ({
      ...initialState,
      ...state
    });

    const initialGetters = {
      hasError(state) {
        return Object.values(state.errors).some(hasError => !!hasError);
      },
      getError: state => field => state.errors[field] || null
    };

    const initialMutations = {
      setCurrent(state, current) {
        state.current = current;
      },
      clearCurrent(state) {
        state.current = null;
      },
      setAll(state, all) {
        state.all = all;
      },
      clearAll(state) {
        state.all = [];
      },
      startLoad(state) {
        state.isLoading = true;
      },
      finishLoad(state) {
        state.isLoading = false;
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
        const clearedState = getInitialState();
        Object.keys(clearedState).forEach((key) => {
          state[key] = clearedState[key];
        });
      }
    };

    const initialActions = {
      setCurrent(thisModule, current) {
        thisModule.commit('setCurrent', current);
      },
      clearCurrent(thisModule) {
        thisModule.commit('clearCurrent');
      },
      setAll(thisModule, all) {
        thisModule.commit('setAll', all);
      },
      clearAll(thisModule) {
        thisModule.commit('clearAll');
      },
      startLoad(thisModule) {
        thisModule.commit('startLoad');
      },
      finishLoad(thisModule) {
        thisModule.commit('finishLoad');
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
        thisModule.commit('clearError', errorKey);
      },
      clearErrors(thisModule) {
        thisModule.commit('clearErrors');
      },
      reset(thisModule) {
        thisModule.commit('reset');
      }
    };

    // assign properties
    this.namespaced = true;
    this.state = getInitialState();
    this.getters = {
      ...getters,
      ...initialGetters
    };
    this.mutations = {
      ...mutations,
      ...initialMutations
    };
    this.actions = {
      ...actions,
      ...initialActions
    };
  }
}
