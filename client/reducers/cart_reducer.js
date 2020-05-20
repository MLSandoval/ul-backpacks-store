import types from '../actions/types.js'

const DEFAULT_STATE = {
  cart_uuid: '',
  cart_items: {}
}

export default function cartReducer(state = DEFAULT_STATE, action) {
  console.log()
  switch (action.type) {
    case types.PRODUCT_ADDED_TO_CART:
      return {...state, cart_items: action.payload}
    case types.ALTERED_ITEM_QUANTITY:
      return {...state, cart_items: action.payload}
    case types.PRODUCT_REMOVED_FROM_CART:
      return {...state, cart_items: action.payload}
    case types.CART_CLEARED: 
      return {...state, cart_items:{}}
    case types.CART_DATA_RETRIEVED: 
      return action.payload
    default:
      return state
  }
}
