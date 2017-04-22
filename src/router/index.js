import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from './Home';
// import Counter from './Counter'

const Counter = resolve => require.ensure([], () => resolve(require('./Counter').default), 'counter');
const GeographicalIp = resolve => require.ensure([], () => resolve(require('./GeographicalIp').default));

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
    name: 'geographicalIp',
    path: '/geographical-ip',
    component: GeographicalIp,
    meta: {
      title: 'Geographical Ip'
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.afterEach(to => {
  if (to.meta.title !== undefined) {
    document.title = `${ to.meta.title } - Vue-vuex-starter-kit`
  }
})

export default router
