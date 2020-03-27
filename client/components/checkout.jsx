import React, {createRef} from 'react'
import {connect} from 'react-redux'
import {Link, Route} from 'react-router-dom'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import './styles/checkout_style.css'


class Checkout extends React.Component{
  constructor(props){
    super(props)
   
  }

  componentDidMount(){
    console.log('Checkout component mounted this.props: ', this.props)
  }

  componentWillUnmount(){

  }

  onChange(e) {
    console.log('checkout onChange called e.target.value: ', e.target.value)
    this.props.inputValue += e.target.value
  }
  
  onSubmit(e) {
    e.preventDefault()
    console.log('modal on submit hit')
    //send form values to state and then to backend
  }

  render(){
    return(
        <Modal.Body>
          <h5>Enter Payment and Shipping Information</h5>
          <Form>
            <h2>Login</h2>
            <hr />
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                // isInvalid={props.loginForm.errors.email.length > 0}
                // isValid={
                //   props.loginForm.values.email &&
                //   props.loginForm.errors.email.length === 0
                // }
                // onChange={e => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {/* {props.loginForm.errors.email} */}
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                // isInvalid={props.loginForm.errors.password.length > 0}
                // isValid={
                //   props.loginForm.values.password &&
                //   props.loginForm.errors.password.length === 0
                // }
                // onChange={e => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                {/* {props.loginForm.errors.password} */}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              // onClick={() =>
              //   props.dispatch({ type: "FORM_SUBMIT", payload: { email, password } })
              // }
            >
              Submit
            </Button>
          </Form>
          <p>
            Form will go in here?
          </p>
        </Modal.Body>
    )
  }
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
    // fName,
    // lName,
    // ccNumber,
    // ccExpiration,
    // ccCVV,
    // billingAdress,
    // state,
    // shippingMethod,
  }
}

export default connect(mapStateToProps, null)(Checkout)