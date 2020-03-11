import types from '../actions/types.js'

const DEFAULT_STATE = 0

export default function computeTotalReducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.CART_TOTAL_COMPUTED:
            return action.payload
        default:
            return state
    };
}
