import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const state = {
  count: 0
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {},
  strict: !__PROD__,
})

export default store
