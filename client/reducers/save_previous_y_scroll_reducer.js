import types from "../actions/types"

const DEFAULT_STATE = 0

export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case types.PREVIOUS_Y_SAVED:
      return action.payload
    default:
      return state
  }
}