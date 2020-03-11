import types from '../actions/types.js'

const DEFAULT_STATE = []

export default function cartReducer(state = DEFAULT_STATE, action) { 
  console.log('cart_reducer called, action:', action)
  switch (action.type) {
    case types.PRODUCT_ADDED_TO_CART:
      return [...state, action.payload ]
    case types.PRODUCT_REMOVED_FROM_CART:
        return state.filter(element => {console.log('filtering state for item removal from cart, element: ', element); element.id !== action.id}) || ['place holder array for item removal']
    default:
      return state
  };
}
