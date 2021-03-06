import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {Link, useHistory, withRouter} from 'react-router-dom'

import {clearCart, setModalConfig} from '../actions'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function ThankYou (props) {
  useEffect(()=>{
    return ()=>{
      props.clearCart(props.cart.cart_uuid)
      props.setModalConfig({
        header: '',
        content: null,
        orderCost: ''
      })
    }
  }, [])

  return(
      <Modal.Body>
        <div>Your order has been submitted.</div>
        <div>Receipt and order information will be sent via email.</div>
      <Modal.Footer>
        <Button as={Link} to="/" variant="info" className="btn-sm" onClick={()=>{props.clearCart(props.cart.cart_uuid)}}>
          <div>Return to the homepage.</div>
        </Button>
      </Modal.Footer>
        {/* {() => {setTimeout(5000, history.push('/'))}} */}
      </Modal.Body>
  )
}

function mapStateToProps (state){
  return {
    totalOrderCost: state.totalOrderCost,
    checkoutFormData: state.checkoutFormData,
    cart: state.cart
  }
}

export default withRouter(connect(mapStateToProps, {clearCart, setModalConfig})(ThankYou))