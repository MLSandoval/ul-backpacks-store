import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import {storeCheckoutFormData, setModalConfig, placeOrder, validateCheckoutForm} from '../actions'

import ThankYou from './thank_you.jsx'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function Checkout(props){

  function shipSameAsBill(){
    if(props.checkoutFormData.values.shipSameAsBill === true){
      props.storeCheckoutFormData({
        shipSameAsBill: false,
        shipStreetAddress: '',
        shipCity: '',
        shipState: '',
        shipZip: ''
      })
    }else{
      props.storeCheckoutFormData({
        shipSameAsBill: true,
        shipStreetAddress: props.checkoutFormData.values.billStreetAddress,
        shipCity: props.checkoutFormData.values.billCity,
        shipState: props.checkoutFormData.values.billState,
        shipZip: props.checkoutFormData.values.billZip
      })
      props.validateCheckoutForm(props.checkoutFormData, {
        shipCity: true,
        shipState: true,
        shipZip: true,
        shipStreetAddress: true
      })
    }
  }

  function clearForm(){
    props.storeCheckoutFormData({
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
      shipZip: '',
      shipSameAsBill: false
    })
  }

  function handleRadioClick(shippingOption){
    props.storeCheckoutFormData('shippingOption', shippingOption)
  }

  const handleSubmitClick = ()=>{
    let finalFormData = {...props.checkoutFormData}
    props.validateCheckoutForm(finalFormData, {
      firstLoad: true,
      email: true,
      nameOnCard: true,
      cardNumber: true,
      cardExp: true,
      cvv: true,
      billStreetAddress: true,
      billCity: true,
      billState: true,
      billZip: true,
      shipStreetAddress: true,
      shipCity: true,
      shipState: true,
      shipZip: true
    })

    
    let errorsArr = Object.values(props.checkoutFormData.errors)
    let errorSwitch = errorsArr.map(input=>{
      return input !== '' ?  true : false
    })
  
    if(!errorSwitch.includes(true)){
      props.placeOrder(props.userData.user_uuid, props.cart, props.checkoutFormData)
      props.setModalConfig({
        header:'Thank You!',
        content: <ThankYou/>,
        orderCost: ``
      })
    } 
  }
 
  useEffect(()=>{
    props.validateCheckoutForm(props.checkoutFormData, {firstLoad: true})
    return ()=>{
      clearForm()
    }

  },[])

  return(
    <React.Fragment>
      <Modal.Body>
        <Form className="row">
          <h5 className='col-8 col-sm-9'>Email Address</h5>
          <div className="col-4 col-sm-3">
            <Button className="btn-sm w-100" variant="dark" type="button" onClick={() => clearForm()}>
              Clear Info
            </Button>
          </div>
          <hr/>

          <Form.Group className="col-12 col-sm-9" controlId="formEmail">
            <Form.Control
              type="emailAddress"
              placeholder="Enter Email"
              value={props.checkoutFormData.values.email}
              isInvalid={props.checkoutFormData.errors.email.length > 0}
              isValid={
                props.checkoutFormData.values.email &&
                props.checkoutFormData.errors.email.length === 0
              }
              onChange={(e) => {
                props.storeCheckoutFormData('email', e.target.value)
                props.validateCheckoutForm(props.checkoutFormData, {email: true})
              }}
            />
            <Form.Control.Feedback type="invalid">
              {props.checkoutFormData.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        
          <h5 className='col-12'>Shipping Options</h5>
          
          <Form.Group className="col-12 " controlId="formShippingOptions">
            <Form.Label className="">Shipping Options</Form.Label>
            <Form.Check 
              name="shipRadios"
              className="" 
              type="radio" 
              label="Standard(5-6 Days) +$0.00" 
              checked={props.checkoutFormData.values.shippingOption === 'Standard' ? true : false}
              onChange={() =>{
                handleRadioClick('Standard')
              }}
            />
            <Form.Check 
              name="shipRadios"
              className="" 
              type="radio" 
              label="2-day +$10.00" 
              checked={props.checkoutFormData.values.shippingOption === '2-day' ? true : false}
              onChange={() =>{
                handleRadioClick('2-day')
              }}
            />
            <Form.Check 
              name="shipRadios"
              className="" 
              type="radio" 
              label="Overnight Expedited +$20.00" 
              checked={props.checkoutFormData.values.shippingOption === 'Overnight' ? true : false}
              onChange={() =>{
                handleRadioClick('Overnight')
              }}
            />
          </Form.Group>

          <h5 className='col-12'>Payment</h5>

          <Form.Group className="col-12" controlId="formNameOnCard">
            <Form.Label>Name on Card</Form.Label>
            <Form.Control
              type="nameOnCard"
              placeholder="Enter Name"
              value={props.checkoutFormData.values.nameOnCard}
              isInvalid={props.checkoutFormData.errors.nameOnCard.length > 0}
              isValid={
                props.checkoutFormData.values.nameOnCard &&
                props.checkoutFormData.errors.nameOnCard.length === 0
              }
              onChange={(e) => {
                props.storeCheckoutFormData('nameOnCard', e.target.value)
                props.validateCheckoutForm(props.checkoutFormData, {nameOnCard: true})
              }}
            />
            <Form.Control.Feedback type="invalid">
              {props.checkoutFormData.errors.nameOnCard}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-12 col-sm-6" controlId="formCardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="cardNumber"
              placeholder="Enter Card Number"
              value={props.checkoutFormData.values.cardNumber}
              isInvalid={props.checkoutFormData.errors.cardNumber.length > 0}
              isValid={
                props.checkoutFormData.values.cardNumber &&
                props.checkoutFormData.errors.cardNumber.length === 0
              }
              onChange={(e) => { 
                props.storeCheckoutFormData('cardNumber', e.target.value)
                props.validateCheckoutForm(props.checkoutFormData, {cardNumber: true})
              }}
            />
            <Form.Control.Feedback type="invalid">
              {props.checkoutFormData.errors.cardNumber}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              
            </Form.Text>
          </Form.Group>

          <Form.Group className="col-6 col-sm-3" controlId="formCardExp">
            <Form.Label>Exp.</Form.Label>
            <Form.Control
              type="cardExp"
              placeholder="MM/YY"
              value={props.checkoutFormData.values.cardExp}
              isInvalid={props.checkoutFormData.errors.cardExp.length > 0}
              isValid={
                props.checkoutFormData.values.cardExp &&
                props.checkoutFormData.errors.cardExp.length === 0
              }
              onChange={(e) => {
                props.storeCheckoutFormData('cardExp', e.target.value)
                props.validateCheckoutForm(props.checkoutFormData, {cardExp: true})
              }}
            />
            <Form.Control.Feedback type="invalid">
              {props.checkoutFormData.errors.cardExp}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className=" col-6 col-sm-3" controlId="formCvv">
            <Form.Label>CVV</Form.Label>
            <Form.Control
              type="cvv"
              placeholder="123"
              value={props.checkoutFormData.values.cvv}
              isInvalid={props.checkoutFormData.errors.cvv.length > 0}
              isValid={
                props.checkoutFormData.values.cvv &&
                props.checkoutFormData.errors.cvv.length === 0
              }
              onChange={(e) => {
                props.storeCheckoutFormData('cvv', e.target.value)
                props.validateCheckoutForm(props.checkoutFormData, {cvv: true})
              }}
            />
            <Form.Control.Feedback type="invalid">
              {props.checkoutFormData.errors.cvv}
            </Form.Control.Feedback>
          </Form.Group>
          
          <h5 className='col-12'>Billing Address</h5>

          <Form.Group className="col-12" controlId="formBillStreetAddress">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              type="billStreetAddress"
              placeholder="123 Poke Lane, Apt. 3"
              value={props.checkoutFormData.values.billStreetAddress}
              isInvalid={props.checkoutFormData.errors.billStreetAddress.length > 0}
              isValid={
                props.checkoutFormData.values.billStreetAddress &&
                props.checkoutFormData.errors.billStreetAddress.length === 0
              }
              onChange={(e) => {
                props.storeCheckoutFormData('billStreetAddress', e.target.value)
                props.validateCheckoutForm(props.checkoutFormData, {billStreetAddress: true})
              }}
            />
            <Form.Control.Feedback type="invalid">
              {props.checkoutFormData.errors.billStreetAddress}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-8" controlId="formBillCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="billCity"
              placeholder="Pallet Town"
              value={props.checkoutFormData.values.billCity}
              isInvalid={props.checkoutFormData.errors.billCity.length > 0}
              isValid={
                props.checkoutFormData.values.billCity &&
                props.checkoutFormData.errors.billCity.length === 0
              }
              onChange={(e) => {
                props.storeCheckoutFormData('billCity', e.target.value)
                props.validateCheckoutForm(props.checkoutFormData, {billCity: true})
              }}
            />
            <Form.Control.Feedback type="invalid">
              {props.checkoutFormData.errors.billCity}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-4" controlId="formBillZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="billZip"
              placeholder="12345"
              value={props.checkoutFormData.values.billZip}
              isInvalid={props.checkoutFormData.errors.billZip.length > 0}
              isValid={
                props.checkoutFormData.values.billZip &&
                props.checkoutFormData.errors.billZip.length === 0
              }
              onChange={(e) => {
                props.storeCheckoutFormData('billZip', e.target.value)
                props.validateCheckoutForm(props.checkoutFormData, {billZip: true})
              }}
            />
            <Form.Control.Feedback type="invalid">
              {props.checkoutFormData.errors.billZip}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-8" controlId="formBillState">
            <Form.Label>State/Territory</Form.Label>
            <Form.Control as="select"
              type="billState"
              placeholder="Kanto Region"
              value={props.checkoutFormData.values.billState}
              isInvalid={props.checkoutFormData.errors.billState.length > 0}
              isValid={
                props.checkoutFormData.values.billState &&
                props.checkoutFormData.errors.billState.length === 0
              }
              onChange={(e) => {
                props.storeCheckoutFormData('billState', e.target.value)
                props.validateCheckoutForm(props.checkoutFormData, {billState: true})
              }}
            >
              <option defaultValue>Select...</option>
              <option>Alabama</option>
              <option>Alaska</option>
              <option>Arizona</option>
              <option>Arkansas</option>
              <option>California</option>
              <option>Colorado</option>
              <option>Connecticut</option>
              <option>Delaware</option>
              <option>Florida</option>
              <option>Georgia</option>
              <option>Hawaii</option>
              <option>Idaho</option>
              <option>Illinois</option>
              <option>Indiana</option>
              <option>Iowa</option>
              <option>Kansas</option>
              <option>Kentucky</option>
              <option>Louisiana</option>
              <option>Maine</option>
              <option>Maryland</option>
              <option>Massachusetts</option>
              <option>Michigan</option>
              <option>Minnesota</option>
              <option>Mississippi</option>
              <option>Missouri</option>
              <option>Montana</option>
              <option>Nebraska</option>
              <option>Nevada</option>
              <option>New Hampshire</option>
              <option>New Jersey</option>
              <option>New Mexico</option>
              <option>New York</option>
              <option>North Carolina</option>
              <option>North Dakota</option>
              <option>Ohio</option>
              <option>Oklahoma</option>
              <option>Oregon</option>
              <option>Pennsylvania</option>
              <option>Rhode Island</option>
              <option>South Carolina</option>
              <option>South Dakota</option>
              <option>Tennessee</option>
              <option>Texas</option>
              <option>Utah</option>
              <option>Vermont</option>
              <option>Virginia</option>
              <option>Washington</option>
              <option>West Virginia</option>
              <option>Wisconsin</option>
              <option>Wyoming</option>
              <option>*</option>
              <option>District of Columbia</option>
              <option>Puerto Rico</option>
              <option>Guam</option>
              <option>American Samoa</option>
              <option>U.S. Virgin Islands</option>
              <option>Northern Mariana Islands</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {props.checkoutFormData.errors.billState}
            </Form.Control.Feedback>
          </Form.Group>
          
          <h5 className='col-12'>Shipping Address</h5>
          
          <Form.Group className="col-12" controlId="formShipSameAddress">
            <Form.Check type="checkbox" label="Shipping address same as billing address." 
              onChange={(e) =>{shipSameAsBill()}}
              checked={props.checkoutFormData.values.shipSameAsBill}
            />
          </Form.Group>

          <Form.Group className="col-12" controlId="formShipStreetAddress">
            <Form.Label>Street Address</Form.Label>
            <Form.Control
              type="shipStreetAddress"
              placeholder="123 Poke Lane, Apt. 3"
              value={props.checkoutFormData.values.shipStreetAddress}
              isInvalid={props.checkoutFormData.errors.shipStreetAddress.length > 0}
              isValid={
                props.checkoutFormData.values.shipStreetAddress &&
                props.checkoutFormData.errors.shipStreetAddress.length === 0
              }
              onChange={(e) => {
                props.storeCheckoutFormData('shipStreetAddress', e.target.value)
                props.validateCheckoutForm(props.checkoutFormData, {shipStreetAddress: true})
              }}
            />
            <Form.Control.Feedback type="invalid">
              {props.checkoutFormData.errors.shipStreetAddress}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-8" controlId="formShipCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="shipCity"
              placeholder="Pallet Town"
              value={props.checkoutFormData.values.shipCity}
              isInvalid={props.checkoutFormData.errors.shipCity.length > 0}
              isValid={
                props.checkoutFormData.values.shipCity &&
                props.checkoutFormData.errors.shipCity.length === 0
              }
              onChange={(e) => {
                props.storeCheckoutFormData('shipCity', e.target.value)
                props.validateCheckoutForm(props.checkoutFormData, {shipCity: true})
              }}
            />
            <Form.Control.Feedback type="invalid">
              {props.checkoutFormData.errors.shipCity}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-4" controlId="formShipZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="shipZip"
              placeholder="12345"
              value={props.checkoutFormData.values.shipZip}
              isInvalid={props.checkoutFormData.errors.shipZip.length > 0}
              isValid={
                props.checkoutFormData.values.shipZip &&
                props.checkoutFormData.errors.shipZip.length === 0
              }
              onChange={(e) => {
                props.storeCheckoutFormData('shipZip', e.target.value)
                props.validateCheckoutForm(props.checkoutFormData, {shipZip: true})
              }}
            />
            <Form.Control.Feedback type="invalid">
              {props.checkoutFormData.errors.shipZip}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-8" controlId="formShipState">
            <Form.Label>State/Territory</Form.Label>
            <Form.Control as="select"
              type="shipState"
              placeholder="Kanto Region"
              value={props.checkoutFormData.values.shipState}
              isInvalid={props.checkoutFormData.errors.shipState.length > 0}
              isValid={
                props.checkoutFormData.values.shipState &&
                props.checkoutFormData.errors.shipState.length === 0
              }
              onChange={(e) => {
                props.storeCheckoutFormData('shipState', e.target.value)
                props.validateCheckoutForm(props.checkoutFormData, {shipState: true})
              }}
            >
              <option defaultValue>Select...</option>
              <option>Alabama</option>
              <option>Alaska</option>
              <option>Arizona</option>
              <option>Arkansas</option>
              <option>California</option>
              <option>Colorado</option>
              <option>Connecticut</option>
              <option>Delaware</option>
              <option>Florida</option>
              <option>Georgia</option>
              <option>Hawaii</option>
              <option>Idaho</option>
              <option>Illinois</option>
              <option>Indiana</option>
              <option>Iowa</option>
              <option>Kansas</option>
              <option>Kentucky</option>
              <option>Louisiana</option>
              <option>Maine</option>
              <option>Maryland</option>
              <option>Massachusetts</option>
              <option>Michigan</option>
              <option>Minnesota</option>
              <option>Mississippi</option>
              <option>Missouri</option>
              <option>Montana</option>
              <option>Nebraska</option>
              <option>Nevada</option>
              <option>New Hampshire</option>
              <option>New Jersey</option>
              <option>New Mexico</option>
              <option>New York</option>
              <option>North Carolina</option>
              <option>North Dakota</option>
              <option>Ohio</option>
              <option>Oklahoma</option>
              <option>Oregon</option>
              <option>Pennsylvania</option>
              <option>Rhode Island</option>
              <option>South Carolina</option>
              <option>South Dakota</option>
              <option>Tennessee</option>
              <option>Texas</option>
              <option>Utah</option>
              <option>Vermont</option>
              <option>Virginia</option>
              <option>Washington</option>
              <option>West Virginia</option>
              <option>Wisconsin</option>
              <option>Wyoming</option>
              <option>*</option>
              <option>District of Columbia</option>
              <option>Puerto Rico</option>
              <option>Guam</option>
              <option>American Samoa</option>
              <option>U.S. Virgin Islands</option>
              <option>Northern Mariana Islands</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {props.checkoutFormData.errors.shipState}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We currently only ship to US addresses
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex">
        <div className="col-9"/>
          <div className="button-container col-3 d-flex flex-column justify-content-around">
            <Button className="col-12" onClick={()=>{handleSubmitClick(props.checkoutFormData)}} className=" btn-sm mb-1" variant="info" type="button">
              Submit
            </Button>
            <Button className="btn-sm" variant="dark" type="button" onClick={()=>{props.history.goBack()}}>
              Cancel
            </Button>
          </div>
      </Modal.Footer>
    </React.Fragment>
  )
}

function mapStateToProps(state){
  return {
    cart: state.cart,
    totalOrderCost: state.totalOrderCost,
    checkoutFormData: state.checkoutFormData,
    modalConfig: state.modalConfig,
    userData: state.userData
  }
}

export default withRouter(connect(mapStateToProps, {storeCheckoutFormData, setModalConfig, placeOrder, validateCheckoutForm})(Checkout))