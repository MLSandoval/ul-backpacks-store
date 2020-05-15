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
    const products = [...props.products]
    console.log('continue shopping generate products:: ', products)

    const cart = Object.entries(props.cart.cart_items)
    const cartArr = []
    cart.forEach(([product_uuid, quantity])=>{
      cartArr.push({product_uuid, quantity})
    })

    // const objectArray = Object.entries(numbers);
    // objectArray.forEach(([key, value]) => {
    //   console.log(key); // 'one'
    //   console.log(value); // 1
    // });
    console.log('cartArr: ', cartArr)
    return( 
      cartArr.map((product)=>{
        console.log('cartArr map, product_uuid, quantity: ', product.product_uuid, product.quantity)
        const element = products.filter(currentIteratedProduct => currentIteratedProduct.product_uuid === product.product_uuid)[0]
        console.log('element where uuids match: ', element)
        return(
          <React.Fragment key={element.product_uuid}>
            <tr key={element.product_uuid}>
              <td>{element.name + ' '}
                <div>by {element.brand}</div>
              </td>
              <td>{product.quantity}</td>
              <td>${(parseInt(element.price) * product.quantity).toFixed(2)}</td>
            </tr>
            {/* <tr><td>placeholder</td></tr> */}
          </React.Fragment>
        )
      })
      // [<tr><td>placeholder</td></tr>,<tr><td>placeholder</td></tr>,<tr><td>placeholder</td></tr>,<tr><td>placeholder</td></tr>]
    )
  }

  useEffect(()=>{
    console.log('continueshopping props: ', props)
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
  console.log('CONTINUESHOPPING state: ', state)
  return {
    products: state.products,
    totalOrderCost: state.totalOrderCost,
    currentProduct: state.currentProduct,
    cart: state.cart
  }
}

export default connect(mapStateToProps, {computeCartTotal})(ContinueShopping)

