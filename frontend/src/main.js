import Vue from 'vue';
import './plugins/vuetify';
import './plugins/mq';
import './plugins/vhCheck';
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import '@/utils/filters';
import '@/utils/directives';
import '@mdi/font/css/materialdesignicons.min.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
