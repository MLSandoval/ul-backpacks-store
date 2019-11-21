import types from './types.js'

export function setView(view) {
    return {
        type: type.SET_VIEW,
        payload: view
    }
}

export function getTestList() {
    // console.log('Get Test List Called')
    return function(dispatch){
        fetch('/api/test').then((resp) => resp.json()).then(data => {
            // console.log('Server:', data);
            dispatch({
                type: types.GET_TEST_LIST,
                payload: data
            });
        });
    }
}

