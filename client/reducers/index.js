import { combineReducers } from 'redux'

import get_products_reducer from './get_products_reducer.js'
import set_view_reducer from "./set_view_reducer.js"
import test_reducer from './test_reducer'
import cart_reducer from './cart_reducer.js'
import set_current_product_reducer from './set_current_product_reducer.js'
import sort_cart_reducer from './sort_cart_reducer.js'
import computeCartTotal from './compute_total_reducer.js'

const rootReducer = combineReducers({
  setView: set_view_reducer,
  test: test_reducer,
  products: get_products_reducer,
  currentProduct: set_current_product_reducer,
  cart: cart_reducer,
  sortedCart: sort_cart_reducer,
  totalOrderCost: computeCartTotal
})

export default rootReducer