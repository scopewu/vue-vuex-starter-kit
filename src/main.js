import Vue from 'vue';

import router from './router';
import MainLayout from './layouts/MainLayout';

new Vue({
  el: '#root',
  data: {},
  router,
  template: '<main-layout/>',
  components: {
    MainLayout
  }
})
