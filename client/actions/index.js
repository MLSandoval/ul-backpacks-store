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
        fetch('/api/test')
        .then((res) => res.json())
        .then(data => {
            // console.log('Server:', data);
            dispatch({
                type: types.GET_TEST_LIST,
                payload: data
            });
        })
        .catch(err =>{
            console.error('Product list fetch error: ', err);
        });
    }
}


export function getProductsList(){
    return function(dispatch){
        fetch('/api/get-products',{
            method: 'GET',
        })
        .then(res => res.json())
        .then(data => {
            console.log('server response on products list call: ', data);
            dispatch({
                type: types.GET_PRODUCTS_LIST,
                payload: data
            })
        })
        .catch(err=>{
            console.log('get products list action error: ', err);
        });
    }
}