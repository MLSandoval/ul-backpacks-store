import types from "../actions/types";

const DEFAULT_STATE = {
  currentProduct: 'No product selected.'
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.SET_CURRENT_PRODUCT:
      // console.log('get product reducer action:', action);
      console.log('setCurrentProduct reducer action.payload: ', action.payload);
      return { ...state, currentProduct: action.payload };
    default:
      return state;
  }
};