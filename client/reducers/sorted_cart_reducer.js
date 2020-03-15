import types from '../actions/types.js'

const DEFAULT_STATE = []

export default function sortedCartReducer(state = DEFAULT_STATE, action) { 
  switch (action.type) {
    case types.CART_SORTED:
      return action.payload
    case types.INCREASED_PRODUCT_QUANTITY:
      return state.map( element => {
        if(element.id === action.payload)
          element.quantity++
        return element
      })
    case types.REDUCED_PRODUCT_QUANTITY:
      return state.map( element => {
        if(element.id === action.payload)
          element.quantity--
        return element
      })
    default:
        return state
  }
}
