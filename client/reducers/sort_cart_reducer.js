import types from '../actions/types.js';

//usually object, can be array, string...any structure to store data
const DEFAULT_STATE = {}

export default function sortCartQuantities(state = DEFAULT_STATE, action) { //action = {type: 'SET_VIEW'}
    console.log('sort_cart_reducer called, action:', action)
    switch (action.type) {
        case types.CART_SORTED:
            //use the spread operator and state variable because this switch in the reducer will completely
            //replace the object dictating state, and we need to keep all state every time there is a re-render
            return action.payload
        default:
            return state
    };
}
