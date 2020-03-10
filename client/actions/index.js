/* global fetch */
import types from './types.js'

export function setView (view) {
  return {
    type: types.VIEW_CHANGED,
    payload: view
  }
}

export function getTestList () {
// console.log('Get Test List Called')
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
        // console.log('server response on products list call: ', data)
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
    // console.log('setCurrentProduct action, productId: ', productId)
    dispatch({
      type: types.SET_CURRENT_PRODUCT,
      payload: productId
    })
  }
}


//pass product id, name, and cost into the cart before sorting, sort cart based on id inside product object
export function addToCart (product) {
  return function (dispatch) {
    console.log('addToCart action called, product: ', product)
    dispatch({
      type: types.PRODUCT_ADDED_TO_CART,
      payload: {
        id: product.id,
        price: product.price,
        name: product.name
      }
    })
  }
}

export function sortCartQuantities(cart){
  console.log('sortCartTotals action called cart: ', cart)
  const sortedCartQuantities = cart.reduce((accumulator, currentValue)=>{
    console.log('sortCartTotals reduce iteration, currentValue: ', currentValue)
    if(!!accumulator[currentValue.id] === false){
      accumulator[currentValue.id] = {}
      accumulator[currentValue.id].name = currentValue.name
      accumulator[currentValue.id].price = currentValue.price
      accumulator[currentValue.id].quantity = 1
      console.log('accumulator first property: ', accumulator)
    }else{
      accumulator[currentValue.id].quantity += 1
      console.log('accumulator incremented property: ', accumulator)
    }
    return accumulator
  }, {})

  return function(dispatch){
    dispatch({
      type: types.CART_SORTED,
      payload: sortedCartQuantities
    })
  }
  
  //or more elegant way to count elements in the array
  // const sortedCart = cart.reduce((map, product) => ({
  //   ...map,
  //   [product]: (map[product] || 0) + 1,
  // }), {})
}

export function computeCartTotal(sortedCart){
  // total = totaledProductValues.reduce((accumulator, currentValue)=>{
  //   accumulator+=currentValue
  // },0)
  let total = []
  console.log('computeCartTotal action called, sortedCart: ', sortedCart)
  for (let product in sortedCart){
    console.log('product iteration in sortedCart in computeCartTotal action: ', product)
  }

  return function (dispatch) {
    // console.log('addToCart action called, product: ', product)
    dispatch({
      type: types.CART_TOTAL_COMPUTED,
      payload: total
    })
  }
}