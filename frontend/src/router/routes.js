import Home from '../views/Home/Home.vue';
import Login from '../views/Login/Login.vue';
import SignUp from '../views/SignUp/SignUp.vue';

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
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  }
];
