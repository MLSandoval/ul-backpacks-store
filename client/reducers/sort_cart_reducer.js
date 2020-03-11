import types from '../actions/types.js';

const DEFAULT_STATE = []

export default function sortCartQuantities(state = DEFAULT_STATE, action) { 
    switch (action.type) {
        case types.CART_SORTED:
            return action.payload
        default:
            return state
    };
}
