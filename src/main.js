import Vue from 'vue';

import router, { routes } from './router';
import MainLayout from './layouts/MainLayout';

new Vue({
  el: '#root',
  data: {
    router, routes
  },
  router,
  components: {
    MainLayout
  }
})
