import React, {createRef} from 'react'

import {Link as LinkRouter, Route} from 'react-router-dom'

import { connect } from 'react-redux'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import './styles/continue_shopping_style.css'

function ContinueShopping(props){


  return(
    <Modal.Body>
      <div className="button-container col-3 row justify-content-around">
        <LinkRouter to="/cart" className="">
          <Button
            className="btn-sm"
            variant="info"
            type="button"
            onClick={() => {
              console.log('go to cart on click')
              }
            }
          >
            Go to Cart
          </Button>
        </LinkRouter>
        <LinkRouter to={`/details/${props.currentProduct.product_uuid}`}>
          <Button
            className="btn-sm"
            variant="dark"
            type="button"
            // onClick={() =>
            //   props.dispatch({ type: "FORM_SUBMIT", payload: { email, password } })
            // }
          >
            Continue Shopping
          </Button>
        </LinkRouter> 
      </div>
    </Modal.Body>
    
    
  )
}

function mapStateToProps(state){
  return {
    totalOrderCost: state.totalOrderCost,
    currentProduct: state.currentProduct
  }
}

export default connect(mapStateToProps)(ContinueShopping)