import types from '../actions/types.js'

const DEFAULT_STATE = 'calc(100vh - 4.6rem)'


export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case types.APP_HEIGHT_SET:
      console.log('set app height reducer reached, action: ', action)
      return (action.payload === 'calc(100vh - 4.6rem)') ? 'auto' : 'calc(100vh - 4.6rem)'
    default:
      return state
  }
}
