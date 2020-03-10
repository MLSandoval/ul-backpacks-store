import types from "../actions/types"

const DEFAULT_STATE = 'Products Loading...'

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.PRODUCT_LIST_REQUESTED:
      // console.log('get product reducer action:', action);
      console.log('get product reducer action.payload.products: ', action.payload.products)
      return action.payload.products
    default:
      return state
  }
};
