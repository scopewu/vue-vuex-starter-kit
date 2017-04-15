import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from './Home';
// import Counter from './Counter'

const Counter = resolve => require.ensure([], () => resolve(require('./Counter').default), 'counter');

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: {
      title: 'Home'
    }
  },
  {
    name: 'counter',
    path: '/counter',
    component: Counter,
    meta: {
      title: 'Counter'
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
