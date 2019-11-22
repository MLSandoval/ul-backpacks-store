import types from "../actions/types";

const DEFAULT_STATE = {
  products: 'No products to display.'
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.GET_PRODUCT_LIST:
      console.log('Action:', action);
      console.log('get product reducer action.payload: ', action);
      return { ...state, products: action.payload.products };
    default:
      return state;
  }
};
