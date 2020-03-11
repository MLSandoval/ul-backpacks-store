import types from '../actions/types.js';

const DEFAULT_STATE = []

export default function sortCartQuantities(state = DEFAULT_STATE, action) { 
    console.log('sort_cart_reducer called, action:', action)
    switch (action.type) {
        case types.CART_SORTED:
            return action.payload
        default:
            return state
    };
}
