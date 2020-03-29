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
  switch(action.type){
    case 'BILL_SHIP_FORM_SUBMITTED':
      return action
    default:
      return state
  }
}