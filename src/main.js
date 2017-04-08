import Vue from 'vue';

import router, {routes} from './router'

function a() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 3000)
  })
}

a().then(() => {
  console.log('success.')
})

new Vue({
  el: '#root',
  router
})
