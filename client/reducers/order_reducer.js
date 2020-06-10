import types from '../actions/types.js'

const DEFAULT_STATE = []

export default function orderReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.ORDER_PLACED:
      console.log('orderReducer order placed, action.payload: ', action.payload)
      return [...state , action.payload]
    case types.ORDERS_RETRIEVED:
      return action.payload
    default:
      return state
  }
}
