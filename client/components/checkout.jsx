import React, {createRef, useState, useEffect, useLayoutEffect} from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'

import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import {storeCheckoutFormData} from '../actions'

import './styles/checkout_style.css'

//next stup, setup a useEffect() or useLayoutEffect() for filling in the shipping data with the billing data,
//also a useEffect() for sending the formData to the store AFTER it is formed to the
function Checkout(props){
  const {to, staticContext, ...rest} = props

  const [email,setEmail] = useState('')

  const [cardNumber, setCardNumber  ] = useState(null)
  const [cardExp, setCardExp  ] = useState(null)
  const [cvv, setCvv  ] = useState(null)
  const [nameOnCard, setNameOnCard  ] = useState('')

  const [billStreetAddr, setBillStreetAddr  ] = useState('')
  const [billCity, setBillCity  ] = useState('')
  const [billState, setBillState  ] = useState('')
  const [billZip, setBillZip  ] = useState('')

  const [shipStreetAddr, setShipStreetAddr  ] = useState('')
  const [shipCity, setShipCity  ] = useState('')
  const [shipState, setShipState  ] = useState('')
  const [shipZip, setShipZip  ] = useState('')

  function shipSameAsBill(){
    console.log('shipSameAsBill called on radio click')
    console.log('checkbox billStreetAddr: ',billStreetAddr)
    console.log('checkbox billCity: ', billCity)
    console.log('checkbox billState: ', billState)
    console.log('checkbox billZip: ', billZip)
  
    setShipStreetAddr(billStreetAddr)
    setShipCity(billCity)
    setShipState(billState)
    setShipZip(billZip)
  
    console.log('checkbox shipStreetAddr: ', shipStreetAddr)
    console.log('checkbox shipCity: ', shipCity)
    console.log('checkbox shipState: ', shipState)
    console.log('checkbox shipZip: ', shipZip)
  }

  function consolidateFormData (callback){
    console.log('consolidate form data email: ', email)
    console.log('consolidate form data cardNumber: ', cardNumber)
    console.log('consolidate form data cardExp: ', cardExp)
    console.log('consolidate form data cvv: ', cvv)
    console.log('consolidate form data nameOnCard: ', nameOnCard)
    console.log('consolidate form data billStreetAddr: ', billStreetAddr)
    console.log('consolidate form data billCity: ', billCity)
    console.log('consolidate form data billState: ', billState)
    console.log('consolidate form data billZip: ', billZip)
    console.log('consolidate form data shipStreetAddr: ', shipStreetAddr)
    console.log('consolidate form data shipCity: ', shipCity)
    console.log('consolidate form data shipState: ', shipState)
    console.log('consolidate form data shipZip: ', shipZip)

    setFormData({
      email,
      paymentInfo: {
        cardNumber,
        cardExp,
        cvv,
        nameOnCard
      },
      billAddr: {
        billStreetAddr,
        billCity,
        billState,
        billZip
      },
      shipAddr: {
        shipStreetAddr,
        shipCity,
        shipState,
        shipZip
      }
    })

    console.log('formData at end of consolidate formData function: ', formData)

    callback(formData)

  }
  
  console.log('checkout comp rendered props: ', props)
  return(
    <Modal.Body>
      <Form className="row">

      <Form.Group className="col-9" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="emailAddress"
            placeholder="Enter Email"
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={e => setEmail(e.target.value)}
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

        <Form.Group className="col-6" controlId="formBasicCardNumber">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="cardNumber"
            placeholder="Enter Card Number"
            // isInvalid={props.loginForm.errors.email.length > 0}
            // isValid={
            //   props.loginForm.values.email &&
            //   props.loginForm.errors.email.length === 0
            // }
            onChange={e => setCardNumber(e.target.value)}
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
            // isInvalid={props.loginForm.errors.email.length > 0}
            // isValid={
            //   props.loginForm.values.email &&
            //   props.loginForm.errors.email.length === 0
            // }
            onChange={e => setCardExp(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {/* {props.loginForm.errors.email} */}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            
          </Form.Text>
        </Form.Group>

        <Form.Group className="col-3" controlId="formBasicCvv">
          <Form.Label>CVV</Form.Label>
          <Form.Control
            type="cvv"
            placeholder="123"
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={e => setCvv(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {/* {props.loginForm.errors.password} */}
          </Form.Control.Feedback>
          {/* <Form.Text className="text-muted">
            MM/YY
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="col-12" controlId="formBasicNameOnCard">
          <Form.Label>Name on Card</Form.Label>
          <Form.Control
            type="nameOnCard"
            placeholder="Enter Name"
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={e => setNameOnCard(e.target.value)}
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
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={e => setBillStreetAddr(e.target.value)}
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
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={e => setBillCity(e.target.value)}
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
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={e => setBillZip(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {/* {props.loginForm.errors.password} */}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-6" controlId="formBasicBillState">
          <Form.Label>State/Territory</Form.Label>
          <Form.Control
            type="billState"
            placeholder="Kanto Region"
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={e => setBillState(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {/* {props.loginForm.errors.password} */}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            We currently only ship to US addresses
          </Form.Text>
        </Form.Group>
        
        <h5 className='col-12'>Shipping Address</h5>
        <hr />
        
        <Form.Group className="col-12" controlId="formBasicShipSameAddress">
          <Form.Check type="checkbox" label="Shipping address same as billing address." 
            onClick={ () =>{ shipSameAsBill()}}
          />
        </Form.Group>

        <Form.Group className="col-12" controlId="formBasicShipStreetAddress">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="shipStreetAddress"
            placeholder="123 Poke Lane, Apt. 3"
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={e => setShipStreetAddr(e.target.value)}
            value={shipStreetAddr}
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
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={e => setShipCity(e.target.value)}
            value={shipCity}
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
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={e => setShipZip(e.target.value)}
            value={shipZip}
          />
          <Form.Control.Feedback type="invalid">
            {/* {props.loginForm.errors.password} */}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="col-6" controlId="formBasicShipState">
          <Form.Label>State/Territory</Form.Label>
          <Form.Control
            type="shipState"
            placeholder="Kanto Region"
            // isInvalid={props.loginForm.errors.password.length > 0}
            // isValid={
            //   props.loginForm.values.password &&
            //   props.loginForm.errors.password.length === 0
            // }
            onChange={e => setShipState(e.target.value)}
            value={shipState}
          />
          <Form.Control.Feedback type="invalid">
            {/* {props.loginForm.errors.password} */}
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            We currently only ship to US addresses
          </Form.Text>
        </Form.Group>
        
        <div className="col-9"></div>
        <div className="button-container col-3 row justify-content-around">
          <Link to="/cart/modal/thankyou" className="">
            <Button
              className=" btn-sm"
              variant="info"
              type="button"
              onClick={() => {
                props.storeCheckoutFormData({
                  email,
                  cardNumber,
                  cardExp,
                  cvv,
                  nameOnCard,
                  billStreetAddr,
                  billCity,
                  billState,
                  billZip,
                  shipStreetAddr,
                  shipCity,
                  shipState,
                  shipZip
                })
              }}
            >
              Submit
            </Button>
          </Link>
          <Link to="/cart">
            <Button
              className="btn-sm"
              variant="dark"
              type="button"
              // onClick={() =>
              //   props.dispatch({ type: "FORM_SUBMIT", payload: { email, password } })
              // }
            >
              Cancel
            </Button>
          </Link> 
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
    checkoutFormData: state.checkoutFormData
  }
}

export default connect(mapStateToProps, {storeCheckoutFormData})(Checkout)