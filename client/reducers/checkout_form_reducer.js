import types from '../actions/types'

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
    email: '',
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

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
function validateCardNumber(cardNumber) {
  var re = /^(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}(?:2131|1800|35\d{3})\d{11})$/
  return re.test(cardNumber)
}
function validateCardExp(cardExp) {
  var re = /^(1[0-2]|0[1-9]|\d)\/([2-9]\d)$/m
  return !re.test(cardExp)
}
function validateCvv(cvv) {
  var re = /^\d{3}$/
  return !re.test(cvv)
}
function validateBillStreetAddress(billStreetAddress) {
  var re = /[^A-Za-z0-9.\-# ]+/
  return re.test(billStreetAddress)
}
function validateBillCity(billCity) {
  var re = /^\p{Lu}\p{L}*(?:[\s-]\p{Lu}\p{L}*)*$/
  return re.test(billCity)
}

function setErrors(state) {

  if (!state.email && state.email.length === 0) {
    state.errors.email = "Email is required"
  } else if (!validateEmail(state.email)) {
    state.errors.email = "Email is invalid"
  }

  if (!state.nameOnCard && state.nameOnCard.length === 0) {
    state.errors.nameOnCard = "Name on card is required"
  } else if (state.nameOnCard.length < 2) {
    state.errors.nameOnCard = "Please enter a valid name"
  }

  if (!state.cardNumber && state.cardNumber.length === 0) {
    state.cardNumber.cardExp = "Card expiration is required"
  } else if (!state.cardNumber.length < 16 || state.cardNumber.length > 20 || validateCardNumber(state.cardNumber)) {
    state.errors.cardNumber = "Please enter a valid card expiration"
  }

  if (!state.cardExp && state.cardExp.length === 0) {
    state.errors.cardExp = "Card expiration is required"
  } else if (!state.cardExp.length === 5 || validateCardExp(state.cardExp)) {
    state.errors.cardExp = "Please enter a valid 'MM/YY' card expiration"
  }

  if (!state.cvv && state.cvv.length === 0) {
    state.errors.cvv = "Card CVV is required"
  } else if (!state.cvv.length === 3 || validateCvv(state.cvv)) {
    state.errors.cvv = "Please enter a valid 3-digit CVV"
  }

  if (!state.billStreetAddress && state.billStreetAddress.length === 0) {
    state.errors.billStreetAddress = "Billing street address is required"
  } else if (!state.billStreetAddress.length === 3 || validateBillStreetAddress(state.billStreetAddress)) {
    state.errors.billStreetAddress = "Please enter a valid 3-digit CVV"
  }

  if (!state.billCity && state.billCity.length === 0) {
    state.errors.billCity = "Billing city is required"
  } else if (!state.billCity.length > 60 || validateBillCity(state.billCity)) {
    state.errors.billCity = "Please enter a valid city name"
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