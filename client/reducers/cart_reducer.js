import types from '../actions/types.js'

const DEFAULT_STATE = []

export default function cartReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.PRODUCT_ADDED_TO_CART:
      return [...state, action.payload ]
    case types.PRODUCT_REMOVED_FROM_CART:
        return state.filter(element => {
          element.id !== action.id
        })
    default:
      return state
  };
}
