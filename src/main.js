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

if (__DEV__) {
  /**
   * See: https://github.com/glenjamin/webpack-hot-middleware/issues/43
   */
  if (module.hot) {
    // TODO: module hot replace need more
    module.hot.accept();
  }
}
