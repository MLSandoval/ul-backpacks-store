import React, {createRef, useEffect} from 'react'
import { connect } from 'react-redux'
import {Link as LinkRouter, Route} from 'react-router-dom'

import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'



import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'


import './styles/continue_shopping_style.css'
import {computeCartTotal} from '../actions'

function ContinueShopping(props){

  function generateRows(){
    console.log('continue shopping generate rows called, props.cart: ', props.cart)
    return( 
      // props.cart.cart_items.map((element)=>{
      //   return(
      //     <React.Fragment key={element.product_uuid}>
      //       <tr key={element.product_uuid}>
      //         <td>{element.name + ' '}
      //           <div>by {element.brand}</div>
      //         </td>
      //         <td>{element.quantity}</td>
      //         <td>${(parseInt(element.price) * element.quantity).toFixed(2)}</td>
      //       </tr>
      //     </React.Fragment>
      //   )
      // })
      <tr><td>pleaseholder</td></tr>
    )
  }

  useEffect(()=>{
    // console.log('continueshopping props: ', props)
    props.computeCartTotal(props.cart.cart_items)
  })

  function computeItemCount(){
    let total=0
    props.cart.map((element)=>{
      total += element.quantity
    })
    return total
  }

  return(
    <React.Fragment key='modalcontentfrag'>
      <Modal.Body> 
        <div  className="d-flex container mt-3">
          <div className="col-9"></div>
          <h6 className="col-3 no-wrap-white" name="top" ></h6>
        </div>
        
        <Table size="sm" key='cxaosiu'>
          <thead key='asdfh'>
            <tr>
              <th>{props.cart.length === 1 ? 'Item' : 'Items' }</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {generateRows()}
            <tr >
              <td ></td>
              <td  className="d-flex justify-content-end no-wrap-white">Cart Total:</td>
              <td >${props.totalOrderCost.toFixed(2)}</td>
            </tr>
            
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer className="d-flex">
        <div className="col-8"></div>
        <div className="button-container col-4 row flex-column justify-content-around">
          <LinkRouter to="/cart">
            <Button
              className="btn-sm col-12 w-100"
              variant="info"
              type="button"
              // onClick={() => {
              //   console.log('go to cart on click')
              //   }
              // }
            >
              Go to Cart
            </Button>
          </LinkRouter>
          <LinkRouter to={`/products`}>
            <Button
              className="btn-sm col-12 w-100"
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
      </Modal.Footer>
    </React.Fragment>
  )
}

function mapStateToProps(state){
  return {
    totalOrderCost: state.totalOrderCost,
    currentProduct: state.currentProduct,
    cart: state.cart
  }
}

export default connect(mapStateToProps, {computeCartTotal})(ContinueShopping)

