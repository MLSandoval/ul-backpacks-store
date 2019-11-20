import { combineReducers } from "redux";
import set_view_reducer from "./set_view_reducer.js";

const rootReducer = combineReducers({
  setView: set_view_reducer
});

export default rootReducer;
