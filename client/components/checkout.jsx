import React, {createRef, useState, useEffect, useLayoutEffect} from 'react'
import {connect} from 'react-redux'
import {Link as LinkRouter, Route} from 'react-router-dom'

import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'

import {storeCheckoutFormData, setModalConfig, clearCart, placeOrder} from '../actions'

import './styles/checkout_style.css'
import ThankYou from './thank_you.jsx'

function Checkout(props){

  function shipSameAsBill(){
    if(props.checkoutFormData.shipSameAsBill === true){
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
        shipStreetAddress: props.checkoutFormData.billStreetAddress,
        shipCity: props.checkoutFormData.billCity,
        shipState: props.checkoutFormData.billState,
        shipZip: props.checkoutFormData.billZip
      })
    }
  }

  const handleSubmitClick = ()=>{
    props.setModalConfig({
      header:'Thank You!',
      content: <ThankYou/>,
      orderCost: ``
    })
    
    props.placeOrder(props.userData.user_uuid, props.cart)
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
      shipZip: ''
    })
  }
    
  function handleRadioClick(shippingOption){
    props.storeCheckoutFormData('shippingOption', shippingOption)
  }

  return(
    <Modal.Body>
      <Form className="row">
        <h5 className='col-9'>Email Address</h5>
        <div className="col-3">
          <Button
            className="btn-sm w-100"
            variant="dark"
            type="button"
            onClick={() => clearForm()
            }
          >
            Clear Info
          </Button>
        </div>
        <hr/>

        <Form.Group className="col-9" controlId="formBasicEmail">
          {/* <Form.Label>Email Address</Form.Label> */}
          <Form.Control
            type="emailAddress"
            placeholder="Enter Email"
            value={props.checkoutFormData.email}
            isInvalid={props.checkoutForm.errors.password.length > 0}
            isValid={
              props.loginForm.values.password &&
              props.loginForm.errors.password.length === 0
            }
            onChange={(e) => {props.storeCheckoutFormData('email', e.target.value)}}
          />
          <Form.Text className="text-muted">
            Email required for order receipt
          </Form.Text>
          <Form.Control.Feedback type="invalid">
            {/* {props.loginForm.errors.password} */}
          </Form.Control.Feedback>
        </Form.Group>
      
        <h5 className='col-12'>Payment and Shipping</h5>
        <hr />
        
        <Form.Group className="col-12 " controlId="formBasicShippingOptions">
          <Form.Label className="">Shipping Options</Form.Label>
          <Form.Check 
            name="shipRadios"
            className="" 
            type="radio" 
            label="Standard(5-6 Days) +$0.00" 
            checked={props.checkoutFormData.shippingOption === 'Standard' ? true : false}
            onChange={() =>{
              handleRadioClick('Standard')
            }}
          />
          <Form.Check 
            name="shipRadios"
            className="" 
            type="radio" 
            label="2-day +$10.00" 
            checked={props.checkoutFormData.shippingOption === '2-day' ? true : false}
            onChange={() =>{
              handleRadioClick('2-day')
            }}
          />
          <Form.Check 
            name="shipRadios"
            className="" 
            type="radio" 
            label="Overnight Expedited +$20.00" 
            checked={props.checkoutFormData.shippingOption === 'overnight' ? true : false}
            onChange={() =>{
              handleRadioClick('overnight')
            }}
          />
        </Form.Group>

        <Form.Group className="col-6" controlId="formBasicCardNumber">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="cardNumber"
            placeholder="Enter Card Number"
            value={props.checkoutFormData.cardNumber}
            // isInvalid={props.loginForm.errors.email.length > 0}
            // isValid={
            //   props.loginForm.values.email &&
            //   props.loginForm.errors.email.length === 0
            // }
            onChange={(e) => { props.storeCheckoutFormData('cardNumber', e.target.value)}}
          />
          <Form.Control.Feedback type="invalid">
            {/* {props.loginForm.errors.email} */}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            
          </Form.Text>
        </Form.Group>

        <Form.Group className="col-3" controlId="formBasicCardExp">
          <Form.Label>Exp.</Form.Label>
          <Form.Control
            type="cardExp"
            placeholder="MM/YY"
            value={props.checkoutFormData.cardExp}
            // isInvalid={props.loginForm.errors.email.length > 0}
            // isValid={
            //   props.loginForm.values.email &&
            //   props.loginForm.errors.email.length === 0
            // }
            onChange={(e) => {props.storeCheckoutFormData('cardExp', e.target.value)}}
          />
          <Form.Control.Feedback type="invalid">
            {/* {props.loginForm.errors.email} */}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-3" controlId="formBasicCvv">
          <Form.Label>CVV</Form.Label>
          <Form.Control
            type="cvv"
            placeholder="123"
            value={props.checkoutFormData.cvv}
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={(e) => {props.storeCheckoutFormData('cvv', e.target.value)}}
          />
          <Form.Control.Feedback type="invalid">
            {/* {props.loginForm.errors.password} */}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-12" controlId="formBasicNameOnCard">
          <Form.Label>Name on Card</Form.Label>
          <Form.Control
            type="nameOnCard"
            placeholder="Enter Name"
            value={props.checkoutFormData.nameOnCard}
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={(e) => {props.storeCheckoutFormData('nameOnCard', e.target.value)}}
          />
          <Form.Control.Feedback type="invalid">
            {/* {props.loginForm.errors.password} */}
          </Form.Control.Feedback>
        </Form.Group>
        
        <h5 className='col-12'>Billing Address</h5>
        <hr />

        <Form.Group className="col-12" controlId="formBasicBillStreetAddress">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="billStreetAddress"
            placeholder="123 Poke Lane, Apt. 3"
            value={props.checkoutFormData.billStreetAddress}
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={(e) => {props.storeCheckoutFormData('billStreetAddress', e.target.value)}}
          />
          <Form.Control.Feedback type="invalid">
            {/* {props.loginForm.errors.password} */}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-3" controlId="formBasicBillCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="billCity"
            placeholder="Pallet Town"
            value={props.checkoutFormData.billCity}
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={(e) => {props.storeCheckoutFormData('billCity', e.target.value)}}
          />
          <Form.Control.Feedback type="invalid">
            {/* {props.loginForm.errors.password} */}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-3" controlId="formBasicBillZip">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="billZip"
            placeholder="12345"
            value={props.checkoutFormData.billZip}
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={(e) => {props.storeCheckoutFormData('billZip', e.target.value)}}
          />
          <Form.Control.Feedback type="invalid">
            {/* {props.loginForm.errors.password} */}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-6" controlId="formBasicBillState">
          <Form.Label>State/Territory</Form.Label>
          <Form.Control as="select"
            type="billState"
            placeholder="Kanto Region"
            value={props.checkoutFormData.billState}
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={(e) => {props.storeCheckoutFormData('billState', e.target.value)}}
          >
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
            {/* {props.loginForm.errors.password} */}
          </Form.Control.Feedback>
       
        </Form.Group>
        
        <h5 className='col-12'>Shipping Address</h5>
        <hr />
        
        <Form.Group className="col-12" controlId="formBasicShipSameAddress">
          <Form.Check type="checkbox" label="Shipping address same as billing address." 
            onChange={(e) =>{shipSameAsBill()}}
            checked={props.checkoutFormData.shipSameAsBill}
          />
        </Form.Group>

        <Form.Group className="col-12" controlId="formBasicShipStreetAddress">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="shipStreetAddress"
            placeholder="123 Poke Lane, Apt. 3"
            value={props.checkoutFormData.shipStreetAddress}
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={(e) => {props.storeCheckoutFormData('shipStreetAddress', e.target.value)}}
          />
          <Form.Control.Feedback type="invalid">
            {/* {props.loginForm.errors.password} */}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-3" controlId="formBasicShipCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="shipCity"
            placeholder="Pallet Town"
            value={props.checkoutFormData.shipCity}
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={(e) => {props.storeCheckoutFormData('shipCity', e.target.value)}}
            
          />
          <Form.Control.Feedback type="invalid">
            {/* {props.loginForm.errors.password} */}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-3" controlId="formBasicShipZip">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="shipZip"
            placeholder="12345"
            value={props.checkoutFormData.shipZip}
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={(e) => {props.storeCheckoutFormData('shipZip', e.target.value)}}
            
          />
          <Form.Control.Feedback type="invalid">
            {/* {props.loginForm.errors.password} */}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-6" controlId="formBasicShipState">
          <Form.Label>State/Territory</Form.Label>
          {/* <Form.Control
            type="shipState"
            placeholder="Kanto Region"
            value={props.checkoutFormData.shipState}
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            
          /> */}
          <Form.Control as="select"
            type="shipState"
            placeholder="Kanto Region"
            value={props.checkoutFormData.shipState}
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={(e) => {props.storeCheckoutFormData('shipState', e.target.value)}}
          >
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
            {/* {props.loginForm.errors.password} */}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            We currently only ship to US addresses
          </Form.Text>
        </Form.Group>
        
        <div className="col-9"/>
        
        <div className="button-container col-3 row justify-content-around">
          <Button 
            as={LinkRouter}
            to="/cart/modal/thank-you"
            className=""
            onClick={()=>{handleSubmitClick()}}
            className=" btn-sm"
            variant="info"
            type="button"
          >
            Submit
          </Button>
          <LinkRouter to="/cart">
            <Button
              className="btn-sm"
              variant="dark"
              type="button"
            >
              Cancel
            </Button>
          </LinkRouter> 
        </div>
      </Form>
    </Modal.Body>
  )
}

function mapDispatchToProps (dispatch) {
  return {
    onChange: dispatch()
  }
}

function mapStateToProps(state){
  console.log('state in Checkout component: ', state)
  return {
    cart: state.cart,
    totalOrderCost: state.totalOrderCost,
    checkoutFormData: state.checkoutFormData,
    modalConfig: state.modalConfig,
    userData: state.userData
  }
}

export default connect(mapStateToProps, {storeCheckoutFormData, setModalConfig, clearCart, placeOrder})(Checkout)
