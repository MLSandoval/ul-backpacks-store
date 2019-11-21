import types from "../actions/types";

const DEFAULT_STATE = {
  products: 'No products to display.'
};

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS_LIST:
      // console.log('Action:', action);
      return { ...state, products: action.payload.products };
    default:
      return state;
  }
};
