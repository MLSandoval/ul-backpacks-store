/* global fetch */
import types from './types.js'

export function setView (view) {
  return {
    type: types.VIEW_CHANGED,
    payload: view
  }
}

export function getTestList () {
  return function (dispatch) {
    fetch('/api/test')
      .then((res) => res.json())
      .then(data => {
        dispatch({
          type: types.TEST_LIST_REQUESTED,
          payload: data
        })
      })
      .catch(err => {
        console.error('Test list fetch error: ', err)
      })
  }
}

export function getProductList () {
  return function (dispatch) {
    fetch('/api/fetch-products', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
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

export function addItemToCart (product) {//also need to add query to add item to database cart when this is clicked
  console.log('addItemToCart action called, product: ', product)
  return function (dispatch) {
    dispatch({
      type: types.PRODUCT_ADDED_TO_CART,
      payload: {...product,
        quantity: product.quantity || 1
      }
    })
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

export function increaseItemQuantity(product_uuid){
  return function (dispatch) {
    dispatch({
      type: types.INCREASED_PRODUCT_QUANTITY,
      payload: product_uuid
    })
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

export function computeCartTotal(cart){
  let total = 0
  for (let product in cart){
    total += parseInt(cart[product].quantity) * parseInt(cart[product].price)
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

export function clearCart(){
  return function(dispatch){
    dispatch({
      type: types.CART_CLEARED
    })
  }
}

export function getUserData(user_uuid){
  console.log('getUserData action hit, user_uuid arg: ', user_uuid)
  return function(dispatch){
    fetch('/api/get-user', {
      method: 'GET',
      headers: {
        user_uuid
      }
    })
    .then(res=>res.json())
    .then((data)=>{
      const {user_uuid, cart_uuid, email, first_name, last_name} = data
      console.log('getUserData action called, data: ', data)
      // localStorage.setItem('user_uuid', user_uuid)
      console.log('get user data action, local storage after set before dispatch: ', localStorage)
        dispatch({
          type: types.USER_DATA_RETRIEVED,
          payload: {user_uuid, cart_uuid, email, first_name, last_name}
        })
      }
    )
    .catch(err=>console.error('Error at getUserData action: ', err))
  }
}

export function createNewUser(email, first_name, last_name){
  return function(dispatch){
    fetch('/api/create-user', {
      method: 'PUT',
      body: {
        email,
        first_name,
        last_name
      }
    })
    .then(res=>res.json())
    .then((data)=>{
      const {user_uuid, cart_uuid} = data
      console.log('createNewUser action called, data: ', data)
      localStorage.setItem('user_uuid', user_uuid)
      console.log('CREATE NEW USER action, local storage after set before dispatch: ', localStorage)
        dispatch({
          type: types.NEW_USER_CREATED,
          payload: {user_uuid, cart_uuid}
        })
      }
    )
    .catch(err=>console.error('Error at createUser action: ', err))
  }
}
