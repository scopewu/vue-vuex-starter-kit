import * as types from './mutation-types'

const actions = {
  countIncrement({commit}) {
    commit(types.COUNT_INCREMENT)
  },
  countDecrement({commit}) {
    commit(types.COUNT_DECREMENT)
  }
}

export default actions
