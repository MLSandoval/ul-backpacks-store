import types from '../actions/types'

const DEFAULT_STATE = {
  view: null
}

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.PRODUCT_DETAILS_REQUESTED:
      return { ...state, list: action.payload.list }
    default:
      return state
  }
}