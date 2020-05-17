import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {Link as LinkRouter, Route} from 'react-router-dom'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import './styles/continue_shopping_style.css'
import {computeCartTotal} from '../actions'

function ContinueShopping(props){
  
  function generateRows(){
    const products = [...props.products]
    console.log('props after products spread op: ', props)

    const cart = Object.entries(props.cart.cart_items)
    const cartArr = []
    cart.forEach(([product_uuid, quantity])=>{
      cartArr.push({product_uuid, quantity})
    })
    console.log('inside generate rows, right before compute cart total products: ', products)
    props.computeCartTotal(props.cart.cart_items, products)
    return( 
      cartArr.map((product)=>{
        console.log('continueShopping cartArr map, cartArr: ', cartArr)
        console.log('continueShopping cartArr map, product: ', product)
        console.log('continueShopping cartArr map, parseInt(product.quantity): ', parseInt(product.quantity))
        
        const element = products.filter(currentIteratedProduct => currentIteratedProduct.product_uuid === product.product_uuid)[0]
        console.log('continueShopping cartArr map, parseInt(element.price): ', parseInt(element.price))
        return(
          <React.Fragment key={element.product_uuid}>
            <tr key={element.product_uuid}>
              <td>{element.name + ' '}
                <div className="small-text">by {element.brand}</div>
              </td>
              <td>{product.quantity}</td>
              <td>${(parseInt(element.price) * parseInt(product.quantity)).toFixed(2)}</td>
            </tr>
          </React.Fragment>
        )
      })
    )
  }

  useEffect(()=>{
    console.log('continueshopping props: ', props)
  })

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
            >
              Go to Cart
            </Button>
          </LinkRouter>
          <LinkRouter to={`/products`}>
            <Button
              className="btn-sm col-12 w-100"
              variant="dark"
              type="button"
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
