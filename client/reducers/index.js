import { combineReducers } from 'redux'

import test_reducer from './test_reducer'
import set_view_reducer from "./set_view_reducer.js"
import get_products_reducer from './get_products_reducer.js'
import cart_reducer from './cart_reducer.js'
import set_current_product_reducer from './set_current_product_reducer.js'
import sorted_cart_reducer from './sorted_cart_reducer.js'
import computed_cart_total from './compute_total_reducer.js'
import checkout_form_submitted_reducer from './checkout_form_submitted_reducer.js'
import save_previous_y_scroll_reducer from './save_pervious_y_scroll_reducer.js'



const rootReducer = combineReducers({
  setView: set_view_reducer,
  test: test_reducer,
  products: get_products_reducer,
  currentProduct: set_current_product_reducer,
  cart: cart_reducer,
  sortedCart: sorted_cart_reducer,
  totalOrderCost: computed_cart_total,
  checkoutFormData: checkout_form_submitted_reducer,
  prevY: save_previous_y_scroll_reducer
})

export default rootReducer