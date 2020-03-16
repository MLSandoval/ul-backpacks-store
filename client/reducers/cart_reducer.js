import types from '../actions/types.js'

const DEFAULT_STATE = []

export default function cartReducer(state = DEFAULT_STATE, action) {
  console.log('CARTREDUCER action.payload: ', action.payload)

  //need to devise test to check if the item objects nested in the cart array exist based on an id comparison, then create new item in cart if it doenst exist yet
  const getNested = (obj, ...args)=>{
    console.log('getNested FUNCTION obj: ', obj)
    console.log('getNested FUNCTION args: ', args)
    let i = 1
    return args.reduce((obj, prop)=>{
      console.log(`getNested FUNCTION obj in reduce ${i} iteration: `, obj)
      console.log(`getNested FUNCTION prop in reduce ${i} iteration: `, prop)
      i++
      obj && obj[prop], prop
    })
  }

  switch (action.type) {
    case types.PRODUCT_ADDED_TO_CART:

      let newState = [];
      if(state.length === 0){
        console.log('PRODuct ADDed first item in cart: ', action.payload)
        newState.push(action.payload)
        return newState
      }
      
      
      newState = [...state]
      
      // if(){}

      newState.filter(element =>{
        console.log('inside newState filter, element: ', element)
        if(element.id === action.payload.id){
          console.log('PRODUCT ADDED REDUCER Increment condition, action.payload: ', action.payload)
          element.quantity++
          action.payload.quantity = element.quantity
        }
      })

      let newObj = Object.assign({}, newState)
      console.log('newObj: ', newObj)
      console.log('CARTREDUCER action.payload.id: ', action.payload.id)
      // console.log(!action.payload in newState)
      console.log(getNested(newState, `${action.payload.id}`))
      console.log('cartReducser newState: ', newState)


      // if(!action.payload in newState){
      //   console.log('payload is not in newState')
      //   onsole.log('PRODUCT ADDED REDUCER else condition, action.payload: ', action.payload)
      //   newState.push(action.payload)
      // }
      
      if(getNested(newObj, action.payload.id) === undefined){
        newState.push(action.payload)
      }

      // console.log('PRODUCT ADDED REDUCER else condition, action.payload: ', action.payload)
      // newState.push(action.payload)
      console.log('cartReducser newState: ', newState)
      return newState

      
      

    case types.PRODUCT_REMOVED_FROM_CART:

        return state.filter((element, index) => {
          if(element.id !== action.payload){
            // console.log('REDUCE ITEM QUANTITY REDUCER action.payload: ', action.payload)
            // console.log('REDUCE ITEM QUANTITY REDUCER element unchanged: ', element)
            return true
          }else{
            // console.log('REDUCE ITEM QUANTITY REDUCER action.payload: ', action.payload)
            // console.log('REDUCE ITEM QUANTITY REDUCER element reduced quantity: ', element)
            
            if(element.quantity > 1)
              element.quantity--
            return true
          }
        })

    default:
      return state
  }
}
