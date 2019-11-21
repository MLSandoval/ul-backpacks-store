import types from '../actions/types';

const DEFAULT_STATE = {
    list: ['John', 'Angela']
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.GET_TEST_LIST:
            // console.log('Action:', action);
            return {...state, list: action.payload.list};
        default:
            return state;
    }
}
