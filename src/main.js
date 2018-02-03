import Vue from 'vue'
import 'core-js/modules/es6.promise'

import './style/style.scss'

import router from './router'
import MainLayout from './layouts/MainLayout'
import store from './store'

/* eslint-disable no-new */
new Vue({
  el: '#root',
  data: {},
  router,
  store,
  template: '<main-layout/>',
  components: {
    MainLayout
  }
})

if (__DEV__) {
  // Remove productionTip
  Vue.config.productionTip = false
}
