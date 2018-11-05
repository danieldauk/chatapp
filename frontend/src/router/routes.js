import Home from '../views/Home/Home.vue';
import Login from '../views/Login/Login.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];
