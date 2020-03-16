import types from '../actions/types.js'

const DEFAULT_STATE = []

export default function cartReducer(state = DEFAULT_STATE, action) {
  console.log('CARTREDUCER action: ', action)
  switch (action.type) {
    case types.PRODUCT_ADDED_TO_CART:

      let newState = [];
      if(state.length === 0){
        newState.push(action.payload)
        return newState
      }
        
      newState = [...state]
      newState.forEach(element =>{
        console.log('inside FOREACh, element: ', element)
        if(element.id === action.payload.id){
          element.quantity++
        }else{
          newState.push(action.payload)
        } 
      })

      console.log('cartReducser newState: ', newState)
      return newState

    case types.PRODUCT_REMOVED_FROM_CART:
        return state.filter(element => {
          element.id !== action.id
        })
    default:
      return state
  }
}
