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
  console.log('validatecardnumber, does string pass: re.test(cardNumber): ', re.test(cardNumber))
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

  console.log('set errors, currentInputs object: ', currentInputs)
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

  if(currentInputs.email){
    console.log('currentInputs.email true, set email error, ')
    if (!formData.values.email && formData.values.email.length === 0) {
      formData.errors.email = "Enter a valid email"
    } else if (!validateEmail(formData.values.email)) {
      formData.errors.email = "Email is invalid"
    }
    console.log('formData.errors after email set: ', formData.errors)
  }
  
  if(currentInputs.nameOnCard){
    if (!formData.values.nameOnCard && formData.values.nameOnCard.length === 0) {
      formData.errors.nameOnCard = "Name on card is required"
    } else if (formData.values.nameOnCard.length < 2) {
      formData.errors.nameOnCard = "Invalid name"
    }
  }
  
  if(currentInputs.cardNumber){
    console.log('currentInputs.cardNumber true, set cardNumber error, ')
    if (!formData.values.cardNumber && formData.values.cardNumber.length === 0) {
      formData.errors.cardNumber = "Card number is required"
    } else if (formData.values.cardNumber.length < 13 || formData.values.cardNumber.length > 20 || validateCardNumber(formData.values.cardNumber)) {
      formData.errors.cardNumber = "Invalid card number"
    }
    console.log('formData.errors after cardNumber set: ', formData.errors)
  }
  
  if(currentInputs.cardExp){
    console.log('currentInputs.cardExp true, set cardExp error, ')
    if (!formData.values.cardExp && formData.values.cardExp.length === 0) {
      formData.errors.cardExp = "Card expiration is required"
    } else if (!formData.values.cardExp.length === 5 || validateCardExp(formData.values.cardExp)) {
      formData.errors.cardExp = "Invalid 'MM/YY' card expiration"
    }
    console.log('formData.errors after cardExp set: ', formData.errors)
  }

  if(currentInputs.cvv){
    console.log('currentInputs.cvv true, set cvv error, ')
    if (!formData.values.cvv && formData.values.cvv.length === 0) {
      formData.errors.cvv = "Card CVV is required"
    } else if (!formData.values.cvv.length === 3 || validateCvv(formData.values.cvv)) {
      formData.errors.cvv = "Invalid 3-digit CVV"
    }
    console.log('formData.errors after cvv set: ', formData.errors)
  }

  if(currentInputs.billStreetAddress){
    console.log('currentInputs.billStreetAddress true, set billStreet error, ')
    if (!formData.values.billStreetAddress && formData.values.billStreetAddress.length === 0) {
      formData.errors.billStreetAddress = "Billing street address is required"
    } else if (formData.values.billStreetAddress.length < 4 || validateBillStreetAddress(formData.values.billStreetAddress)) {
      formData.errors.billStreetAddress = "Invalid street address"
    }
    console.log('formData.errors after billStreetAddress set: ', formData.errors)
  }

  if(currentInputs.billCity){
    console.log('currentInputs.billCity true, set billCity error, ')
    if (!formData.values.billCity && formData.values.billCity.length === 0) {
      formData.errors.billCity = "Billing city is required"
    } else if (formData.values.billCity.length > 60 || validateBillCity(formData.values.billCity)) {
      formData.errors.billCity = "Invalid city name"
    }
    console.log('formData.errors after billCity set: ', formData.errors)
  }

  if(currentInputs.billState){
    console.log('currentInputs.billState true, set billState error, ')
    if (formData.values.billState === 'Select...' || formData.values.billState === '') {
      formData.errors.billState = "Invalid selection"
    } 
    console.log('formData.errors after billState set: ', formData.errors)
  }

  if(currentInputs.billZip){
    console.log('currentInputs.billZip true, set billZip error, ')
    if (!formData.values.billZip && formData.values.billZip.length === 0) {
      formData.errors.billZip = "Billing zip code is required"
    } else if ( validateBillZip(formData.values.billZip)) {
      formData.errors.billZip = "Invalid zip code"
    }
    console.log('formData.errors after billZip set: ', formData.errors)
  }

  if(currentInputs.shipStreetAddress){
    console.log('currentInputs.billZip true, set shipStreet error, ')
    if (!formData.values.shipStreetAddress && formData.values.shipStreetAddress.length === 0) {
      formData.errors.shipStreetAddress = "Shipping street address is required"
    } else if (formData.values.billStreetAddress.length < 4 || validateShipStreetAddress(formData.values.shipStreetAddress)) {
      formData.errors.shipStreetAddress = "Invalid street address"
    }
    console.log('formData.errors after shipStreet set: ', formData.errors)
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
      return setErrors(action.payload.form, action.payload.key)
    default:
      return state
  }
}