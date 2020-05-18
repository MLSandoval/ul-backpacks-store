/* global fetch */
import types from './types.js'

export function getProductList () {
  return function (dispatch) {
    fetch('/api/get-products', {
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
      console.log('get products request resovles, products sent to state')
      dispatch({
        type: types.PRODUCT_LIST_REQUESTED,
        payload: data
      })
    })
    .catch(err => {
      console.error('Product list fetch error: ', err)
    })
  }
}

export function setCurrentProduct (product) {
  return function (dispatch) {
    dispatch({
      type: types.SET_CURRENT_PRODUCT,
      payload: product
    })
  }
}

export function savePrevY(prevY){
  return function(dispatch){
    dispatch({
      type: types.PREVIOUS_Y_SAVED,
      payload: prevY
    })
  }
}

export function setModalConfig(modalConfig){
  return function(dispatch){
    dispatch({
      type: types.MODAL_CONFIG_SET,
      payload: modalConfig
    })
  }
}
export function addItemToCart (cart, product) {//also need to add query to add item to database cart when this is clicked
  console.log('addItemToCart action called, cart, product: ', cart, product)
  // cart = {
  //   cart_uuid: 123,
  //   cart_items: {}
  // }
  // product = {
  //   product_uuid: 12345
  // }
  return function (dispatch) {
    fetch('/api/add-item-to-cart', {
      method:'PATCH',
      headers:{
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        cart: {
          cart_uuid: cart.cart_uuid,
          cart_items: cart.cart_items
        },
        product: {
          product_uuid: product.product_uuid,
          quantity: product.quantity || 1
        }
      }),
    })
    .then(res => res.json())
    .then(data => {
      console.log('addItemToCart action, data: ', data)
      dispatch({
        type: types.PRODUCT_ADDED_TO_CART,
        payload: data
      })
    })
    .catch(err=>console.error('addItemToCart Error: ', err))

  //   fetch('/api/add-item-to-cart', {
  //     method: 'PUT',
  //     // body: {test:'thisis the body test'}
  //     headers:{
  //       customHeader: 'customboi',
  //       "Content-Type": 'application/json'
  //     },
  //     body:JSON.stringify({bodyStuff: 'this is body stuff'})
  //   })  
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log('add item action request success data: ', data)
  //   })
  //   .catch(err=>console.error(err))
  }

}

export function removeItemFromCart(product_uuid){
  return function (dispatch) {
    dispatch({
      type: types.PRODUCT_REMOVED_FROM_CART,
      payload: product_uuid
    })
  }
}

export function increaseItemQuantity(cart_uuid, product_uuid, incDec){
  return function (dispatch) {
    fetch('/api/inc-dec-quantity', {
      method: "PATCH",
      body: {
        cart_uuid,
        product_uuid,
        incDec
      }
    })
    .then()
    .then(data=>{
      dispatch({
        type: types.INCREASED_PRODUCT_QUANTITY,
        payload: product_uuid
      })
    })
    .catch(err=>console.error('alterItemQuantity Error: ', err))
    
  }
}

export function reduceItemQuantity(product_uuid){
  return function (dispatch) {
    dispatch({
      type: types.REDUCED_PRODUCT_QUANTITY,
      payload: product_uuid
    })
  }
}

export function sortCartQuantities(cart){
  const sortedCartQuantities = cart.reduce((accumulator, currentValue)=>{
    if(!!accumulator[currentValue.id] === false){
      accumulator[currentValue.id] = {}
      accumulator[currentValue.id].name = currentValue.name
      accumulator[currentValue.id].price = currentValue.price
      accumulator[currentValue.id].quantity = 1
      accumulator[currentValue.id].images = currentValue.images,
      accumulator[currentValue.id].id = currentValue.id
    }else{
      accumulator[currentValue.id].quantity += 1
    }
    return accumulator
  }, {})
  
  let quantitiesArr = []
  quantitiesArr = Object.values(sortedCartQuantities)

  return function(dispatch){
    dispatch({
      type: types.CART_SORTED,
      payload: quantitiesArr
    })
  }
}

export function computeCartTotal(cart_items, products){
  if(!products[0]) return 0
  let total = 0
  console.log('computeCartTotal action cart_items: ', cart_items)
  console.log('computeCartTotal action products: ', products)
  for (let key in cart_items){
    let currentProduct = products.filter(prod => key === prod.product_uuid)
    total += parseInt(cart_items[key]) * parseInt(currentProduct[0].price)
  }

  return function (dispatch) {
    dispatch({
      type: types.CART_TOTAL_COMPUTED,
      payload: total
    })
  }
}

export function storeCheckoutFormData(key, value){
  if(typeof key === 'string'){
    return function(dispatch){
      dispatch({
        type: types.CHECKOUT_FORM_SUBMITTED_SINGLE,
        key,
        value
      })
    }
  }else{
    return function(dispatch){
      dispatch({
        type: types.CHECKOUT_FORM_SUBMITTED_MULTIPLE,
        payload: key
      })
    }
  }
}

export function clearCart(){
  return function(dispatch){
    dispatch({
      type: types.CART_CLEARED
    })
  }
}

export function getUserData(user_uuid, products){
  return function(dispatch){
    fetch('/api/get-user', {
      method: 'GET',
      headers: {
        user_uuid
      }
    })
    .then(res=>res.json())
    .then((data)=>{
      const {user_uuid, email, first_name, last_name, cart_items, cart_uuid} = data
        dispatch({
          type: types.USER_DATA_RETRIEVED,
          payload: {
            user_uuid,
            email, 
            first_name, 
            last_name, 
          }
        })

        // const cart = Object.entries(cart_items)
        // const cartKeys = Object.keys(cart_items)
        // console.log('cartKeys: ', cartKeys)
        // console.log('PRODUCTS: ', products)
        // cartKeys.map((key)=>{
        //   const currentIndex = products.findIndex(element=>element.product_uuid === key)
        //   console.log('carKeys map currentIndex: ', currentIndex)
        // })

        // const cartArr = []
        // cart.forEach(([product_uuid, quantity])=>{
        //   cartArr.push({product_uuid, quantity})
        // })
        // cartArr.map(item=>{
        //   item = {...item, ...}
        // })

        dispatch({
          type: types.CART_DATA_RETRIEVED,
          payload: {
            cart_uuid,
            cart_items
          }
        })
      }
    )
    .catch(err=>console.error('Error at getUserData action: ', err))
  }
}

export function createNewUser(email, first_name, last_name){
  // console.log('create new user action called: ')
  return function(dispatch){
    fetch('/api/create-user', {
      method: 'PUT',
      body: {
        email,
        first_name,
        last_name
      }
    })
    .then(res => res.json())
    .then(data =>{
      const {user_uuid, cart_uuid} = data
      console.log('user_uuid and cart_uuid from createNewUser Action: ', user_uuid, cart_uuid)
      console.log('createNewUser Action data: ', data)
      localStorage.setItem('user_uuid', user_uuid)
        dispatch({
          type: types.NEW_USER_CREATED,
          payload: {
            user_uuid
          }
        })
        dispatch({
          type: types.CART_DATA_RETRIEVED,
          payload: {
            cart_uuid,
            cart_items: data.hstore_to_json
          }
        })
      })
    .catch(err=>console.error('Error at createUser action: ', err))
  }
}