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
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: types.PRODUCT_LIST_REQUESTED,
          isFetching: true,
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