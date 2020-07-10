import types from '../actions/types.js'

const DEFAULT_STATE = {}

function setModalConfigReducer(state = DEFAULT_STATE, action) { 
  switch (action.type) {
    case types.MODAL_CONFIG_SET:
      return { 
        header: action.payload.header,
        content: action.payload.content,
        orderCost: action.payload.orderCost
      }
    default:
      return state
  }
}

export default setModalConfigReducer