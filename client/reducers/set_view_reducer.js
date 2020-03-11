import types from '../actions/types.js'

//usually object, can be array, string...any structure to store data
const DEFAULT_STATE = {
    view: 'landingView'
}

function setViewReducer(state = DEFAULT_STATE, action) { 
    
    switch (action.type) {
        case types.SET_VIEW:
            return { ...state, view: action.payload }
        default:
            return state
    }
}

export default setViewReducer