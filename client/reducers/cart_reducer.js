import types from '../actions/types.js'

const DEFAULT_STATE = []

export default function cartReducer(state = DEFAULT_STATE, action) {

  // const getNested = (obj, ...args)=>{
  //   console.log('getNested FUNCTION obj: ', obj)
  //   console.log('getNested FUNCTION args: ', args)
  //   let i = 1
  //   return args.reduce((obj, prop)=>{
  //     console.log(`getNested FUNCTION obj in reduce ${i} iteration: `, obj)
  //     console.log(`getNested FUNCTION prop in reduce ${i} iteration: `, prop)
  //     i++
  //     obj && obj[prop], prop
  //   })
  // }

  switch (action.type) {
    case types.PRODUCT_ADDED_TO_CART:
      console.log('cart REDUCER add to cart called, action.payload: ', action.payload)
      let newState = [];
      if(state.length === 0){
        console.log('cart starts empty, first item in cart: ', action.payload)
        state.push(action.payload)
        return [...state]
      }

      
      
      
      let pushCheck = true
      
      state.forEach(element =>{
        console.log('inside newState forEach, element: ', element)
        console.log('pushCheck should be true: ', pushCheck)
        if(element.product_uuid === action.payload.product_uuid){
          // console.log('PRODUCT ADDED REDUCER Increment condition, action.payload: ', action.payload)
          pushCheck = false
          element.quantity++
          console.log('pushCheck should be false: ', pushCheck)
        }
      })

      if(!pushCheck){
        return [...state]
      }else{
        return [...state, action.payload]
      }
    case types.PRODUCT_REMOVED_FROM_CART:
      console.log('cart REDUCER remove from cart called, action.payload: ', action.payload)
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

      
      

    

    default:
      return state
  }
}
