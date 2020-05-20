import types from '../actions/types.js'

const DEFAULT_STATE = []

export default function orderReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.ORDER_PLACED:
      return {...state, orders: action.payload}
    default:
      return state
  }
}
