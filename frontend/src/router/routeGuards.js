import store from '../store/store';

export const redirectIfNotAuthenticated = async (to, from, next) => {
  if (store.state.login.token && to.name !== 'login') {
    next();
    return;
  }
  if (!store.state.login.token && to.name !== 'login') {
    next('/login');
    return;
  }
  if (!store.state.login.token && to.name === 'login') {
    // check if token is stored in localStorage
    // if token exists and is valid - init app and redirect to bank
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await store.dispatch('login/setToken', token);
        next('/');
      } catch (error) {
        // if token is invalid set clear token and set error
        store.dispatch('login/clearToken');
        store.dispatch('login/setErrors', {
          tokenInvalid: 'Token is Invalid'
        });
      }
    }
    // if token does not exist continue to login page
    next();
    return;
  }
  // if token exist, is valid and target page is "login" - redirect to home page
  next('/');
};
