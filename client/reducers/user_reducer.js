import types from '../actions/types.js'

const DEFAULT_STATE = {}

export default function userReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.NEW_USER_CREATED:
      // console.log('userReducer CREATE NEW hit, action.payload: ', action.payload)
      return action.payload
    case types.USER_DATA_RETRIEVED:
      // console.log('userReducer RETRIEVE EXISTING hit, action.payload: ', action.payload)
      return action.payload
    case types.USER_DATA_UPDATED: 
      console.log('user reducer, order placed and user data updated, action.payload: ', action.payload)
      return action.payload
    default:
      return state
  }
}
