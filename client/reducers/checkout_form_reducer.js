import types from '../actions/types'

const DEFAULT_STATE = {
  values: {
    firstLoad: true,
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
    firstLoad: true,
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
  var re = /[^A-Za-z0-9.,\-# ]+/
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
function validateShipStreetAddress(shipStreetAddress) {
  var re = /[^A-Za-z0-9.,\-# ]+/
  return re.test(shipStreetAddress)
}
function validateShipCity(shipCity) {
  var re = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
  return !re.test(shipCity)
}
function validateShipZip(shipZip) {
  var re = /^[0-9]{5}(?:-[0-9]{4})?$/
  return !re.test(shipZip)
}

function setErrors(formData, currentInputs) {
  for(let error in formData.errors){
    if(formData.errors[error]){
      currentInputs[error] = true
    }
  }

  formData = {...formData}
  formData.errors = {
    firstLoad: '',
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

  if(currentInputs.firstLoad && formData.values.firstLoad){
    formData.errors.firstLoad = "error"
    formData.values.firstLoad = false
  }else{
    formData.errors.firstLoad = ''
  }

  if(currentInputs.email){
    if (!formData.values.email && formData.values.email.length === 0) {
      formData.errors.email = "Enter a valid email"
    } else if (!validateEmail(formData.values.email)) {
      formData.errors.email = "Email is invalid"
    }
  }
  
  if(currentInputs.nameOnCard){
    if (!formData.values.nameOnCard && formData.values.nameOnCard.length === 0) {
      formData.errors.nameOnCard = "Name on card is required"
    } else if (formData.values.nameOnCard.length < 2) {
      formData.errors.nameOnCard = "Invalid name"
    }
  }
  
  if(currentInputs.cardNumber){
    if (!formData.values.cardNumber && formData.values.cardNumber.length === 0) {
      formData.errors.cardNumber = "Card number is required"
    } else if (formData.values.cardNumber.length < 13 || formData.values.cardNumber.length > 20 || validateCardNumber(formData.values.cardNumber)) {
      formData.errors.cardNumber = "Invalid card number"
    }
  }
  
  if(currentInputs.cardExp){
    if (!formData.values.cardExp && formData.values.cardExp.length === 0) {
      formData.errors.cardExp = "Card expiration is required"
    } else if (!formData.values.cardExp.length === 5 || validateCardExp(formData.values.cardExp)) {
      formData.errors.cardExp = "Invalid 'MM/YY' card expiration"
    }
  }

  if(currentInputs.cvv){
    if (!formData.values.cvv && formData.values.cvv.length === 0) {
      formData.errors.cvv = "Card CVV is required"
    } else if (!formData.values.cvv.length === 3 || validateCvv(formData.values.cvv)) {
      formData.errors.cvv = "Invalid 3-digit CVV"
    }
  }

  if(currentInputs.billStreetAddress){
    if (!formData.values.billStreetAddress && formData.values.billStreetAddress.length === 0) {
      formData.errors.billStreetAddress = "Billing street address is required"
    } else if (formData.values.billStreetAddress.length < 4 || validateBillStreetAddress(formData.values.billStreetAddress)) {
      formData.errors.billStreetAddress = "Invalid street address"
    }
  }

  if(currentInputs.billCity){
    if (!formData.values.billCity && formData.values.billCity.length === 0) {
      formData.errors.billCity = "Billing city is required"
    } else if (formData.values.billCity.length > 60 || validateBillCity(formData.values.billCity)) {
      formData.errors.billCity = "Invalid city name"
    }
  }

  if(currentInputs.billState){
    if (formData.values.billState === 'Select...' || formData.values.billState === '') {
      formData.errors.billState = "Invalid selection"
    } 
  }

  if(currentInputs.billZip){
    if (!formData.values.billZip && formData.values.billZip.length === 0) {
      formData.errors.billZip = "Billing zip code is required"
    } else if ( validateBillZip(formData.values.billZip)) {
      formData.errors.billZip = "Invalid zip code"
    }
  }

  if(currentInputs.shipStreetAddress){
    if (!formData.values.shipStreetAddress && formData.values.shipStreetAddress.length === 0) {
      formData.errors.shipStreetAddress = "Shipping street address is required"
    } else if (formData.values.billStreetAddress.length < 4 || validateShipStreetAddress(formData.values.shipStreetAddress)) {
      formData.errors.shipStreetAddress = "Invalid street address"
    }
  }

  if(currentInputs.shipCity){
    if (!formData.values.shipCity && formData.values.shipCity.length === 0) {
      formData.errors.shipCity = "Shipping city is required"
    } else if (formData.values.shipCity.length > 60 || validateShipCity(formData.values.shipCity)) {
      formData.errors.shipCity = "Invalid city name"
    }
  }

  if(currentInputs.shipState){
    if (formData.values.shipState === 'Select...' || formData.values.shipState === ''){
      formData.errors.shipState = "Shipping state is required"
    } 
  }

  if(currentInputs.shipZip){
    if (!formData.values.shipZip && formData.values.shipZip.length === 0) {
      formData.errors.shipZip = "Shipping zip code is required"
    } else if ( validateShipZip(formData.values.shipZip)) {
      formData.errors.shipZip = "Invalid zip code"
    }
  }
  
  return formData
}

export default function (state = DEFAULT_STATE, action){
  let newState = {...state}
  switch(action.type){
    case 'CHECKOUT_FORM_SUBMITTED_SINGLE':
      newState.values[action.key] = action.value
      return {...newState}
    case 'CHECKOUT_FORM_SUBMITTED_MULTIPLE':
      for(let input in action.payload){
        newState.values[input] = action.payload[input]
      }
      return {...newState}
    case 'CHECKOUT_FORM_SUBMITTED_FOR_VALIDATION':
      return setErrors(action.payload.form, action.payload.key)
    default:
      return state
  }
}