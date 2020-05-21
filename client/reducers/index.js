import { combineReducers } from 'redux'

import get_products_reducer from './get_products_reducer'
import cart_reducer from './cart_reducer'
import set_current_product_reducer from './set_current_product_reducer'
import computed_cart_total from './compute_total_reducer'
import checkout_form_reducer from './checkout_form_submitted_reducer'
import save_previous_y_scroll_reducer from './save_previous_y_scroll_reducer'
import set_modal_config_reducer from './set_modal_config_reducer'
import user_reducer from './user_reducer'
import order_reducer from './order_reducer'



const rootReducer = combineReducers({
  products: get_products_reducer,
  currentProduct: set_current_product_reducer,
  cart: cart_reducer,
  totalOrderCost: computed_cart_total,
  checkoutFormData: checkout_form_reducer,
  prevY: save_previous_y_scroll_reducer,
  modalConfig: set_modal_config_reducer,
  userData: user_reducer,
  orders: order_reducer
})

export default rootReducer