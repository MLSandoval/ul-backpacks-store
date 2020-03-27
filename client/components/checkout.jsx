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
      <div className="modal-c">
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        
        <Modal.Body >
          <div className="">
            <div className="">
              <h1>First Name</h1>
              <form type="input" action="URL_on_server_to_send_data_to" onSubmit={this.onSubmit}>
                <input
                  ref={this.inputRef}
                  type="text"
                  onChange={this.onChange}
                  value={this.props.inputValue}
                />
                <button>Save new value</button>
              </form>
            </div>
          </div> 
        </Modal.Body>
      </div>
      
      
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onChange: dispatch()
  }
}

function mapStateToProps(state){
  console.log('state in checkout component: ', state)
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