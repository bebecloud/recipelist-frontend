import Router from 'vue-router';
import Callback from './components/Callback.vue';

const routes = [
  {
    path: '/callback',
    name: 'callback',
    component: Callback,
  },
];

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
