import types from '../actions/types.js'

//usually object, can be array, string...any structure to store data
const DEFAULT_STATE = 0


//takes 2 parameters, current state this reducer is responsible for, and the action
//when app starts, current state coming in will be undfined, need default value to cover it
export default function computeTotalReducer(state = DEFAULT_STATE, action) { //action = {type: 'SET_VIEW'}
    console.log('add_to_cart_reducer called, action:', action)
    switch (action.type) {
        case types.CART_TOTAL_COMPUTED:
            //use the spread operator and state variable because this switch in the reducer will completely
            //replace the object dictating state, and we need to keep all state every time there is a re-render
            return state+= action.payload
        default:
            return state
    };
}
