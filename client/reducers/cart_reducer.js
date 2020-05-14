import types from '../actions/types.js'

const DEFAULT_STATE = {
  cart_uuid: '',
  cart_items: []
}

export default function cartReducer(state = DEFAULT_STATE, action) {

  switch (action.type) {
    case types.PRODUCT_ADDED_TO_CART:
      console.log('cart REDUCER add to cart called, action.payload: ', action.payload)
      // let newState = [];
      // if(state.length === 0){
      //   console.log('cart starts empty, first item in cart: ', action.payload)
      //   newState.push(action.payload)
      //   return newState
      // }
      // let pushCheck = true
      
      // state.forEach(element =>{
      //   // console.log('inside newState forEach, element: ', element)
      //   // console.log('pushCheck should be true: ', pushCheck)
      //   if(element.product_uuid === action.payload.product_uuid){
      //     // console.log('PRODUCT ADDED REDUCER Increment condition, action.payload: ', action.payload)
      //     pushCheck = false
      //     element.quantity++
      //     // console.log('pushCheck should be false: ', pushCheck)
      //   }
      // })

      // if(!pushCheck){
      //   return [...state]
      // }else{
      //   return [...state, action.payload]
      // }
      return {...state, cart_items: action.payload}
    case types.PRODUCT_REMOVED_FROM_CART:
      // console.log('cart REDUCER remove from cart called, action.payload: ', action.payload)
      return (state.filter((element) => {
        if(element.product_uuid !== action.payload){
          return true
        }else{
          return false
        }
        }) 
      ) 
    case types.INCREASED_PRODUCT_QUANTITY:
      console.log('increased product quantity reducer, action.payload should be UUID: ', action.payload)
      return state.map(element => {
        if(element.product_uuid === action.payload){
          console.log(element.quantity)
          element.quantity++
          console.log(element.quantity)
        } 
        return element
      })
      break
    case types.REDUCED_PRODUCT_QUANTITY:
      return state.map(element => {
        if(element.product_uuid === action.payload && element.quantity >1) element.quantity--
        return element
      })

    case types.CART_CLEARED: 
      return []

    case types.CART_DATA_RETRIEVED: 
      return action.payload
    default:
      return state
  }
}
