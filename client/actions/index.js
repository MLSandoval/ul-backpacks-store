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

export function addToCart (product) {
  return function (dispatch) {
    // console.log('addToCart action called, product: ', product)
    dispatch({
      type: types.PRODUCT_ADDED_TO_CART,
      payload: product
    })
  }
}

export function sortCartTotals(cart){
  console.log('sortCartTotals action called')
  const sortedCart = cart.reduce((accumulator, currentValue)=>{
    if(!!accumulator[currentValue] === false){
      accumulator[currentValue]=1
    }else{
      accumulator[currentValue]+=1
    }
    return accumulator
  }, {})

  return function(dispatch){
    dispatch({
      type: types.CART_SORTED,
      payload: sortedCart
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
  console.log('computeCartTotal action called, sortedCart: ', sortedCart)
  const total = 42069

  return function (dispatch) {
    // console.log('addToCart action called, product: ', product)
    dispatch({
      type: types.CART_TOTAL_COMPUTED,
      payload: total
    })
  }
}