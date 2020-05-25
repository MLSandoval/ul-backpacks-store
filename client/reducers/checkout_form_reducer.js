import types from '../actions/types'

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function setErrors(email, password) {
  let errors = { email: "", password: "" }
  if (!email && email.length === 0) {
    errors.email = "Email is required"
  } else if (!validateEmail(email)) {
    errors.email = "Email is invalid"
  }
  if (!password && password.length === 0) {
    errors.password = "Password is required"
  } else if (password.length < 8) {
    errors.password = "Password must have 8 characters"
  }
  return errors
};



const DEFAULT_STATE = {
  values: {
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
  },
  errors: {
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
  
}

export default function (state = DEFAULT_STATE, action){
  switch(action.type){
    case 'CHECKOUT_FORM_SUBMITTED_SINGLE':
      return {...state, [action.key]: action.value }
    case 'CHECKOUT_FORM_SUBMITTED_MULTIPLE':
      return {...state, ...action.payload}
    case 'CHECKOUT_FORM_SUBMITTED_FOR_VALIDATION':
      return {}
    default:
      return state
  }
}