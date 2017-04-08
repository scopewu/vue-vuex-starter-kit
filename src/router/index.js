import VueRouter from 'vue-router';

import Home from './Home/Home.vue'

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
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
export { routes }
