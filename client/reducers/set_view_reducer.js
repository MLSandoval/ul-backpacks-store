import types from '../actions/types.js'

//usually object, can be array, string...any structure to store data
const DEFAULT_STATE = {
    view: 'landingView'
};

//takes 2 parameters, current state this reducer is responsible for, and the action
//when app starts, current state coming in will be undfined, need default value to cover it
function setViewReducer(state = DEFAULT_STATE, action) { //action = {type: 'SET_VIEW'}
    
    switch (action.type) {
        case types.SET_VIEW:
            //use the spread operator and state variable because this switch in the reducer will completely
            //replace the object dictating state, and we need to keep all state every time there is a re-render
            return { ...state, view: action.payload }
        default:
            return state
    };
}

export default setViewReducer