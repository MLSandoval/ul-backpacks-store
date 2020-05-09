import types from '../actions/types'

const DEFAULT_STATE = {
  shipSameAsBill: false,
  email: '',
  shippingOption: 'Standard',
  nameOnCard: '',
  cardNumber: '',
  cardExp: '',
  cvv: '',
  billStreetAddress: '',
  billCity: '',
  billState: '',
  billZip: '',
  shipStreetAddress: '',
  shipCity: '',
  shipState: '',
  shipZip: ''
}

export default function (state = DEFAULT_STATE, action){
  
  switch(action.type){
    case 'CHECKOUT_FORM_SUBMITTED_SINGLE':
      return {...state, [action.key]: action.value }
    case 'CHECKOUT_FORM_SUBMITTED_MULTIPLE':
      return {...state, ...action.payload}
    default:
      return state
  }
}