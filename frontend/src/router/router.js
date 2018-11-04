import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import { redirectIfNotAuthenticated } from './routeGuards';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes
});

router.beforeEach(redirectIfNotAuthenticated);

export default router;
