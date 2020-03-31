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
    fetch('/api/get-products')
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: types.PRODUCT_LIST_REQUESTED,
          isFetching: true,
          payload: data
        })
      })
      .catch(err => {
        console.log('Product list fetch error: ', err)
      })
  }
}

export function setCurrentProduct (productId) {
  return function (dispatch) {
    dispatch({
      type: types.SET_CURRENT_PRODUCT,
      payload: productId
    })
  }
}


export function addItemToCart (product) {
  // console.log('addItemToCart action called, product: ', product)
  return function (dispatch) {
    dispatch({
      type: types.PRODUCT_ADDED_TO_CART,
      payload: {...product,
        quantity: product.quantity || 1
      }
      // {
      //   id: product.id,
      //   brand: product.brand,
      //   price: product.price,
      //   name: product.name,
      //   weight: product.weight,
      //   material: product.material,
      //   images:product.images,
      //   quantity: 0
      // }
    })
  }
}

export function removeItemFromCart(productId){
  return function (dispatch) {
    dispatch({
      type: types.PRODUCT_REMOVED_FROM_CART,
      payload: parseInt(productId)
    })
  }
}

export function increaseItemQuantity(productId){
  return function (dispatch) {
    dispatch({
      type: types.INCREASED_PRODUCT_QUANTITY,
      payload: parseInt(productId)
    })
  }
}

export function reduceItemQuantity(productId){
  return function (dispatch) {
    dispatch({
      type: types.REDUCED_PRODUCT_QUANTITY,
      payload: parseInt(productId)
    })
  }
}

export function sortCartQuantities(cart){
  // console.log('sortCartQuantities action called, cart: ', cart)
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
  // console.log('sortCartQuantities action, quantitiesArr: ', quantitiesArr)

  return function(dispatch){
    dispatch({
      type: types.CART_SORTED,
      payload: quantitiesArr
    })
  }
  //or more elegant way to count elements in the array
  // const sortedCart = cart.reduce((map, product) => ({
  //   ...map,
  //   [product]: (map[product] || 0) + 1,
  // }), {})
}

export function computeCartTotal(cart){
  let total = 0
  for (let product in cart){
    total += cart[product].quantity * cart[product].price
  }

  total = (total/100).toFixed(2)
  return function (dispatch) {
    dispatch({
      type: types.CART_TOTAL_COMPUTED,
      payload: total
    })
  }
}

export function storeCheckoutFormData(formData){
  console.log('storeCheckoutFormData action, formData: ', formData)
  return function(dispatch){
    dispatch({
      type: types.CHECKOUT_FORM_SUBMITTED,
      payload: formData
    })
  }
}