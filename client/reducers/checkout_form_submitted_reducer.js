import types from '../actions/types'

const DEFAULT_STATE = {
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
  console.log('CHECKOUT_form_data_submitted reducer, action: ', action)
  switch(action.type){
    case 'CHECKOUT_FORM_SUBMITTED':
      return action.payload
    default:
      return state
  }
}