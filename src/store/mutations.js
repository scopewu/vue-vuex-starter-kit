import * as types from './mutation-types';

const mutations = {
  [types.COUNT_INCREMENT] (state) {
    state.count++
  },
  [types.COUNT_DECREMENT] (state) {
    state.count--
  }
}

export default mutations
