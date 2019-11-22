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
            dispatch({
                type: types.GET_TEST_LIST,
                payload: data
            });
        })
        .catch(err =>{
            console.error('Test list fetch error: ', err);
        });
    }
}


export function getProductList(){
    return function(dispatch){
        fetch('/api/get-products')
        .then(res => res.json())
        .then(data => {
            console.log('server response on products list call: ', data);
            dispatch({
                type: types.GET_PRODUCT_LIST,
                payload: data
            })
        })
        .catch(err=>{
            console.log('Product list fetch error: ', err);
        });
    }
}