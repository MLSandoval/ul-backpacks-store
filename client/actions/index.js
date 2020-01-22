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
    console.log()
    dispatch({
      type: type.SET_CURRENT_PRODUCT,
      payload: productId
    })
  }
}

export function addToCart (cart, product) {
  return function (dispatch) {
    console.log('addToCart action called, product: ', product)
    dispatch({
      type: types.PRODUCT_ADDED_TO_CART,
      payload: product
    })
  }
}

