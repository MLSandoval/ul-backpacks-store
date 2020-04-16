import types from "../actions/types"

const DEFAULT_STATE = {}


export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.SET_CURRENT_PRODUCT:
      return action.payload 
    default:
      return state
  }
}