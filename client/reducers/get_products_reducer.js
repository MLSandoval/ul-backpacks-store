import types from "../actions/types"

const DEFAULT_STATE = 'Products Loading...'

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.PRODUCT_LIST_REQUESTED:
      return action.payload.products
    default:
      return state
  }
};
