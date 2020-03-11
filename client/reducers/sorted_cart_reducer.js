import types from '../actions/types.js';

const DEFAULT_STATE = []

export default function sortedCartReducer(state = DEFAULT_STATE, action) { 
  switch (action.type) {
    case types.CART_SORTED:
      return action.payload
    case types.INCREASED_PRODUCT_QUANTITY:
      console.log('INCREASED action.payload: ', action.payload)
      return state.map( element => {
        console.log('increase quanity map, element.id: ', element.id)
        console.log('increase quanity map, action.payload: ', action.payload)
        if(element.id === action.payload)
          element.quantity++
        return element
      })
    case types.REDUCED_PRODUCT_QUANTITY:
      console.log('REDUCED action.payload: ', action.payload)
      return state.map( element => {
        console.log('reduce quanity map, element: ', element)
        if(element.id === action.payload)
          element.quantity--
        return element
      })
    default:
        return state
  };
}
