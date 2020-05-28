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
  return !re.test(cardNumber)
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
  var re = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
  return !re.test(billCity)
}
function validateBillZip(billZip) {
  var re = /^[0-9]{5}(?:-[0-9]{4})?$/
  return !re.test(billZip)
}

function setErrors(formData) {
  formData = {...formData}
  formData.errors = {
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

  // for(let key in formData.errors){
  //   console.log('inside forin loop, formData.errors[key]: ', formData.errors[key])
  //   formData.errors[key] = ''
  // }
  // console.log('formData.errors after reset: ', formData.errors)

  if (!formData.values.email && formData.values.email.length === 0) {
    formData.errors.email = "Enter a valid email"
  } else if (!validateEmail(formData.values.email)) {
    formData.errors.email = "Email is invalid"
  }

  if (!formData.values.nameOnCard && formData.values.nameOnCard.length === 0) {
    formData.errors.nameOnCard = "Name on card is required"
  } else if (formData.values.nameOnCard.length < 2) {
    formData.errors.nameOnCard = "Invalid name"
  }

  if (!formData.values.cardNumber && formData.values.cardNumber.length === 0) {
    formData.errors.cardNumber = "Card number is required"
  } else if (!formData.values.cardNumber.length < 16 || formData.values.cardNumber.length > 20 || validateCardNumber(formData.values.cardNumber)) {
    formData.errors.cardNumber = "Invalid card number"
  }

  if (!formData.values.cardExp && formData.values.cardExp.length === 0) {
    formData.errors.cardExp = "Card expiration is required"
  } else if (!formData.values.cardExp.length === 5 || validateCardExp(formData.values.cardExp)) {
    formData.errors.cardExp = "Invalid 'MM/YY' card expiration"
  }

  if (!formData.values.cvv && formData.values.cvv.length === 0) {
    formData.errors.cvv = "Card CVV is required"
  } else if (!formData.values.cvv.length === 3 || validateCvv(formData.values.cvv)) {
    formData.errors.cvv = "Invalid 3-digit CVV"
  }

  if (!formData.values.billStreetAddress && formData.values.billStreetAddress.length === 0) {
    formData.errors.billStreetAddress = "Billing street address is required"
  } else if (formData.values.billStreetAddress.length < 4 || validateBillStreetAddress(formData.values.billStreetAddress)) {
    formData.errors.billStreetAddress = "Invalid street address"
  }

  if (!formData.values.billCity && formData.values.billCity.length === 0) {
    formData.errors.billCity = "Billing city is required"
  } else if (formData.values.billCity.length > 60 || validateBillCity(formData.values.billCity)) {
    formData.errors.billCity = "Invalid city name"
  }

  if (formData.values.billState === 'Select...' || formData.values.billState === '') {
    formData.errors.billformData = "Billing state is required"
  } 

  if (!formData.values.billZip && formData.values.billZip.length === 0) {
    formData.errors.billZip = "Billing zip code is required"
  } else if ( validateBillZip(formData.values.billZip)) {
    formData.errors.billZip = "Invalid zip code"
  }

  if (!formData.values.shipStreetAddress && formData.values.shipStreetAddress.length === 0) {
    formData.errors.shipStreetAddress = "Shipping street address is required"
  } else if (formData.values.billStreetAddress.length < 4 || validateBillStreetAddress(formData.values.shipStreetAddress)) {
    formData.errors.shipStreetAddress = "Invalid street address"
  }

  if (!formData.values.shipCity && formData.values.shipCity.length === 0) {
    formData.errors.shipCity = "Shipping city is required"
  } else if (formData.values.shipCity.length > 60 || validateBillCity(formData.values.shipCity)) {
    formData.errors.shipCity = "Invalid city name"
  }

  if (formData.values.shipState === 'Select...' || formData.values.shipState === ''){
    formData.errors.shipformData = "Shipping state is required"
  } 

  if (!formData.values.shipZip && formData.values.shipZip.length === 0) {
    formData.errors.shipZip = "Shipping zip code is required"
  } else if ( validateBillZip(formData.values.shipZip)) {
    formData.errors.shipZip = "Invalid zip code"
  }
  console.log('setErrors, formData: ', formData)
  return formData
}

export default function (state = DEFAULT_STATE, action){
  let newState = {...state}
  switch(action.type){
    case 'CHECKOUT_FORM_SUBMITTED_SINGLE':
      console.log('checkoutform reducer single submit, action.key, actino.value: ', action.key, action.value)
      newState.values[action.key] = action.value
      return {...newState}
    case 'CHECKOUT_FORM_SUBMITTED_MULTIPLE':
      console.log('checkoutform reducer multiple submit, action.payload: ', action.payload)
      for(let input in action.payload){
        console.log('inside for in multiple submit, action.payload[input]: ', action.payload[input])
        newState.values[input] = action.payload[input]
      }
      return {...newState}
    case 'CHECKOUT_FORM_SUBMITTED_FOR_VALIDATION':
      console.log('checkout form reducer validation, action.payload: ', action.payload)
      return setErrors(action.payload)
    default:
      return state
  }
}