import VueRouter from 'vue-router';

const routes = [
  {
    name: 'home',
    path: '/',
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

if (__DEV__) {
  console.log(process.env.NODE_ENV);
  console.log(Array(100).fill(1))
}

export default router
export {routes}
