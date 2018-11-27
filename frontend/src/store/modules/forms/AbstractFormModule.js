/* eslint no-shadow: 0 */

export default class AbstractFormModule {
  constructor({ state = {}, getters = {}, mutations = {}, actions = {} }) {
    const initialData = () => {
      if (state.data) {
        return {
          ...state.data
        };
      }
      return {};
    };

    const initialState = () => ({
      errors: {},
      data: initialData(),
      isFormEditable: true
    });
    const initialGetters = {
      hasError(state) {
        return Object.values(state.errors).some(hasError => !!hasError);
      },
      hasValue(state) {
        return Object.values(state.data).some(value => !!value);
      },
      getError: state => field => state.errors[field] || null
    };
    const initialMutations = {
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
      setFormEditability(state, isFormEditable) {
        state.isFormEditable = isFormEditable;
      },
      reset(state) {
        // acquire initial state and assign it's values to current state
        const clearedState = initialState();
        Object.keys(clearedState).forEach((key) => {
          state[key] = clearedState[key];
        });
      }
    };
    const initialActions = {
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
        if (typeof errors !== 'object') {
          thisModule.commit('setErrors', {});
          console.error(`Trying to set store module's "errors" property with ${typeof errors} instead of object`);
          return;
        }
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
      setFormEditability(thisModule, isFormEditable) {
        thisModule.commit('setFormEditability', isFormEditable);
      },
      reset(thisModule) {
        thisModule.commit('reset');
      }
    };

    // assign properties
    this.namespaced = true;
    this.state = initialState();
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
