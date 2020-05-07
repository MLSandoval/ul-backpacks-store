import types from '../actions/types'

const DEFAULT_STATE = {
  email: '',
  paymentInfo:{
    nameOnCard: '',
    cardNumber: -1,
    cardExp: -1,
    cvv: -1
  },
  billingAdress: {
    streetAdress: '',
    city: '',
    "state/province": '',
    zip: -1
  },
  shippingAdress: {
    streetAdress: '',
    city: '',
    "state/province": '',
    zip: -1
  }
}

export default function (state = DEFAULT_STATE, action){
  
  switch(action.type){
    case 'CHECKOUT_FORM_SUBMITTED':
      console.log('checkout form submitted reducer hit, action: ', action)
      return {...state, [action.key]: action.value }
    default:
      return state
  }
}