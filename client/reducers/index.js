import { combineReducers } from "redux";

import get_product_reducer from './get_product_reducer.js';

import set_view_reducer from "./set_view_reducer.js";
import test_reducer from './test_reducer';

const rootReducer = combineReducers({
  setView: set_view_reducer,
  test: test_reducer,
  products: get_product_reducer
});

export default rootReducer;


// state = {
//   setView: {},
//   test: {
//     list: [],
//   },
//   products
// }