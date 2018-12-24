import jwt from 'jsonwebtoken';
import store from '../store/store';
import { initSocket } from '@/services/socket/socket';

export const redirectIfNotAuthenticated = async (to, from, next) => {
  const publicRoutes = [
    'login',
    'signup'
  ];
  if (store.state.login.token && !publicRoutes.includes(to.name)) {
    next();
    return;
  }
  if (!store.state.login.token && !publicRoutes.includes(to.name)) {
    next('/login');
    return;
  }
  if (!store.state.login.token && publicRoutes.includes(to.name)) {
    // check if token is stored in localStorage
    // if token exists and is valid - init app and redirect to bank
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await store.dispatch('login/setToken', token);
        const { _id: userId } = jwt.verify(token, process.env.VUE_APP_TOKEN_PUBLIC_KEY);
        await initSocket(token, userId);
        next('/');
      } catch (error) {
        // if token is invalid set clear token and set error
        store.dispatch('login/clearToken');
        store.dispatch('login/setErrors', {
          error: 'Token is Invalid'
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
