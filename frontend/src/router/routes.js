import Chat from '../views/Chat/Chat.vue';
import Login from '../views/Login/Login.vue';

export default [
  {
    path: '/',
    name: 'chat',
    component: Chat
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];
