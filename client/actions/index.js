import types from './types.js'

export function getProductList () {
  return function (dispatch) {
    fetch('/api/get-products', {
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: types.PRODUCT_LIST_REQUESTED,
        payload: data
      })
    })
    .catch(err => {
      console.error('Product list fetch error: ', err)
    })
  }
}

export function setCurrentProduct (product) {
  return function (dispatch) {
    dispatch({
      type: types.SET_CURRENT_PRODUCT,
      payload: product
    })
  }
}

export function savePrevY(prevY){
  return function(dispatch){
    dispatch({
      type: types.PREVIOUS_Y_SAVED,
      payload: prevY
    })
  }
}

export function setModalConfig(modalConfig){
  return function(dispatch){
    dispatch({
      type: types.MODAL_CONFIG_SET,
      payload: modalConfig
    })
  }
}
export function addItemToCart (cart, product) {
  return function (dispatch) {
    fetch('/api/add-item-to-cart', {
      method:'PATCH',
      headers:{
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        cart: {
          cart_uuid: cart.cart_uuid,
          cart_items: cart.cart_items
        },
        product: {
          product_uuid: product.product_uuid,
          quantity: product.quantity || 1
        }
      })
    })
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: types.PRODUCT_ADDED_TO_CART,
        payload: data
      })
    })
    .catch(err=>console.error('addItemToCart Error: ', err))
  }
}

export function removeItemFromCart(cart_uuid, product_uuid){
  return function (dispatch) {
    fetch('/api/remove-item', {
      method: "PATCH",
      headers:{
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        cart_uuid,
        product_uuid
      })
    })
    .then(res=>res.json())
    .then(data=>{
      dispatch({
        type: types.PRODUCT_REMOVED_FROM_CART,
        payload: data
      })
    })
    .catch(err=>console.error('Remove Item action Error: ', err))
  }
}

export function alterItemQuantity(cart_uuid, product_uuid, incDec){
  return function (dispatch) {
    fetch('/api/alter-quantity', {
      method: 'PATCH',
      body: JSON.stringify({
        cart_uuid,
        product_uuid,
        incDec
      }),
      headers: {
        "Content-Type": 'application/json'
      }
    })
    .then(res=>res.json())
    .then(data=>{
      dispatch({
        type: types.ALTERED_ITEM_QUANTITY,
        payload: data
      })
    })
    .catch(err=>console.error('alterItemQuantity Error: ', err))
  }
}

export function computeCartTotal(cart_items, products){
  let total = 0
  for (let key in cart_items){
    let currentProduct = products.filter(prod => key === prod.product_uuid)
    if(currentProduct){
      total += parseInt(cart_items[key]) * parseInt(currentProduct[0].price)
    }
  }
 
  return function (dispatch) {
    dispatch({
      type: types.CART_TOTAL_COMPUTED,
      payload: total
    })
  }
}

export function storeCheckoutFormData(key, value){
  if(typeof key === 'string'){
    return function(dispatch){
      dispatch({
        type: types.CHECKOUT_FORM_SUBMITTED_SINGLE,
        key,
        value
      })
    }
  }else{
    return function(dispatch){
      dispatch({
        type: types.CHECKOUT_FORM_SUBMITTED_MULTIPLE,
        payload: key
      })
    }
  }
}

export function validateCheckoutForm(checkoutFormData, key){
  return function(dispatch){
    dispatch({
      type: types.CHECKOUT_FORM_SUBMITTED_FOR_VALIDATION,
      payload: {
        form: {...checkoutFormData},
        key
      }
    })
  }
}

export function getUserData(user_uuid, products){
  return function(dispatch){
    fetch('/api/get-user', {
      method: 'GET',
      headers: {
        user_uuid
      }
    })
    .then(res=>res.json())
    .then((data)=>{
      const {user_uuid, email, name, cart_items, cart_uuid} = data
        dispatch({
          type: types.USER_DATA_RETRIEVED,
          payload: {
            user_uuid,
            email, 
            name
          }
        })
        dispatch({
          type: types.CART_DATA_RETRIEVED,
          payload: {
            cart_uuid,
            cart_items
          }
        })
      }
    )
    .catch(err=>console.error('Error at getUserData action: ', err))
  }
}

export function createNewUser(email, name){
  return function(dispatch){
    fetch('/api/create-user', {
      method: 'PUT',
    })
    .then(res => res.json())
    .then(data =>{
      const {user_uuid, cart_uuid, cart_items} = data
      localStorage.setItem('user_uuid', user_uuid)
        dispatch({
          type: types.NEW_USER_CREATED,
          payload: {
            user_uuid
          }
        })
        dispatch({
          type: types.CART_DATA_RETRIEVED,
          payload: {
            cart_uuid,
            cart_items
          }
        })
      })
    .catch(err=>console.error('Error at createUser action: ', err))
  }
}

export function placeOrder (user_uuid, cart, formData){
  const {cart_uuid} = cart
  return function(dispatch){
    fetch('/api/place-order', {
      method: 'PUT',
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify({
        user_uuid,
        cart_uuid,
        formData: formData.values
      })
    })
    .then(res=>res.json())
    .then(data=>{
      const {order_uuid, user_uuid, items, order_date, card_number, ship_city, ship_street_address, ship_zip, ship_state} = data
      dispatch({
        type: types.ORDER_PLACED,
        payload: {
          order_uuid,
          user_uuid,
          items,
          order_date,
          card_number,
          ship_city,
          ship_street_address,
          ship_zip,
          ship_state
        }
      })
      
    })
    .catch(err=>console.error('Place Order Action Error: ', err))
  }
}

export function clearCart(cart_uuid){
  return function(dispatch){
    fetch('/api/clear-cart', {
      method: 'PATCH',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cart_uuid
      })
    })
    .then(res=>res.json())
    .then(data=>{
      dispatch({
        type: types.CART_CLEARED,
        action: {}
      })
    })
    .catch(err=>console.error('Clear Cart Fetch Error: ', err))
  }
}

export function getOrders(user_uuid){
  if(!user_uuid) return {type:types.ORDERS_RETRIEVED, payload: []}
  return function(dispatch){
    fetch('/api/get-orders', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        user_uuid
      }
    })
    .then(res=>res.json())
    .then(data=>{
      dispatch({
        type: types.ORDERS_RETRIEVED,
        payload: data
      })
    })
  }
}