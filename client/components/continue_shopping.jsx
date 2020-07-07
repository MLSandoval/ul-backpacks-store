import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {Link as LinkRouter, Route} from 'react-router-dom'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import './styles/continue_shopping_style.css'
import {computeCartTotal} from '../actions'

function ContinueShopping(props){

  useEffect(()=>{
    // props.computeCartTotal(props.cart.cart_items, props.products, props.currentProduct)
  })
  
  function generateRows(){
    const products = [...props.products]
    const cart = Object.entries(props.cart.cart_items)
    const cartArr = [] 
    cart.forEach(([product_uuid, quantity])=>{
      cartArr.push({product_uuid, quantity: parseInt(quantity)})
    })
    return( 
      cartArr.map((product)=>{
        const element = products.filter(currentIteratedProduct => currentIteratedProduct.product_uuid === product.product_uuid)[0]
        return(
          <React.Fragment key={element.product_uuid}>
            <tr key={element.product_uuid}>
              <td className="text-center">{element.name + ' '}
                <div className="small-text">by {element.brand}</div>
              </td>
              <td className="text-center">{product.quantity}</td>
              <td className="text-center">${(parseInt(element.price) * parseInt(product.quantity)).toFixed(2)}</td>
            </tr>
          </React.Fragment>
        )
      })
    )
  }

  let cartCount = Object.values(props.cart.cart_items)
  console.log('cartCount in continueShipping: ', cartCount)

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
              <th className="text-center">{cartCount.length < 2 ? 'Item' : 'Items' }</th>
              <th className="text-center">Quantity</th>
              <th className="text-center">Price</th>
            </tr>
          </thead>
          <tbody>
            {generateRows()}
          </tbody>
        </Table>
        <div className="w-100 d-flex">
          <div className="col-7 col-md-8 "></div>
          <div className="font-weight-bold no-wrap-white">Total: ${props.totalOrderCost.toFixed(2)}</div>

        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex">
        <div className="col-9"></div>
        <div className="button-container col-3 row flex-column justify-content-around">
          <LinkRouter to="/cart">
            <Button
              className="btn-sm col-12 w-100 mb-1"
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
  // console.log('CONTINUESHOPPING state: ', state)
  return {
    products: state.products,
    totalOrderCost: state.totalOrderCost,
    currentProduct: state.currentProduct,
    cart: state.cart
  }
}

export default connect(mapStateToProps, {computeCartTotal})(ContinueShopping)
