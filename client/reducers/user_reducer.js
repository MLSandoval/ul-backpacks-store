import types from '../actions/types.js'

const DEFAULT_STATE = {}

export default function userReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.NEW_USER_CREATED:
      return action.payload
    case types.USER_DATA_RETRIEVED:
      return action.payload
    case types.USER_DATA_UPDATED: 
      return action.payload
    default:
      return state
  }
}