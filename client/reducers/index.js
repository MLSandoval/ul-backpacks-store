import { combineReducers } from "redux"

import get_product_reducer from './get_product_reducer.js'
import set_view_reducer from "./set_view_reducer.js"
import test_reducer from './test_reducer'
import add_to_cart_reducer from './add_to_cart_reducer.js'

const rootReducer = combineReducers({
  setView: set_view_reducer,
  test: test_reducer,
  products: get_product_reducer,
  cart: add_to_cart_reducer
});

export default rootReducer