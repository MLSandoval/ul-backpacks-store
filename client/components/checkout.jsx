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
    const {to, staticContext, ...rest} = this.props
    return(
        <Modal.Body>
          
          <Form className="row">
            <h5 className='col-12'>Payment and Shipping</h5>
            <hr />
            <Form.Group className="col-6" controlId="formBasicEmail">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Card Number"
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
                
              </Form.Text>
            </Form.Group>

            <Form.Group className="col-3" controlId="formBasicEmail">
              <Form.Label>Exp.</Form.Label>
              <Form.Control
                type="email"
                placeholder="MM/YY"
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
                
              </Form.Text>
            </Form.Group>

            <Form.Group className="col-3" controlId="formBasicPassword">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="password"
                placeholder="123"
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
              {/* <Form.Text className="text-muted">
                MM/YY
              </Form.Text> */}
            </Form.Group>

            <Form.Group className="col-12" controlId="formBasicPassword">
              <Form.Label>Name on Card</Form.Label>
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
            
            <h5 className='col-12'>Billing Adress</h5>
            <hr />

            <Form.Group className="col-12" controlId="formBasicPassword">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="password"
                placeholder="123 Poke Lane, Apt. 3"
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

            <Form.Group className="col-3" controlId="formBasicPassword">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="password"
                placeholder="Pallet Town"
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

            <Form.Group className="col-3" controlId="formBasicPassword">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="password"
                placeholder="12345"
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

            <Form.Group className="col-6" controlId="formBasicPassword">
              <Form.Label>State/Province</Form.Label>
              <Form.Control
                type="password"
                placeholder="Kanto Region"
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
              <Form.Text className="text-muted">
                We currently only ship to US addresses
              </Form.Text>
            </Form.Group>
            
            <h5 className='col-12'>Shipping Address</h5>
            <hr />
            
            <Form.Group className="col-12" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Shipping address same as billing address." />
            </Form.Group>

            <Form.Group className="col-12" controlId="formBasicPassword">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="password"
                placeholder="123 Poke Lane, Apt. 3"
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

            <Form.Group className="col-3" controlId="formBasicPassword">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="password"
                placeholder="Pallet Town"
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

            <Form.Group className="col-3" controlId="formBasicPassword">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="password"
                placeholder="12345"
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

            <Form.Group className="col-6" controlId="formBasicPassword">
              <Form.Label>State/Province</Form.Label>
              <Form.Control
                type="password"
                placeholder="Kanto Region"
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
              <Form.Text className="text-muted">
                We currently only ship to US addresses
              </Form.Text>
            </Form.Group>
            
            <div className="col-8"></div>
            <Button
              className="col-2"
              variant="primary"
              type="button"
              // onClick={() =>
              //   props.dispatch({ type: "FORM_SUBMIT", payload: { email, password } })
              // }
            >
              Submit
            </Button>
            <Button
              className="col-2"
              variant="danger"
              type="button"
              // onClick={() =>
              //   props.dispatch({ type: "FORM_SUBMIT", payload: { email, password } })
              // }
            >
              Cancel
            </Button>


          </Form>
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