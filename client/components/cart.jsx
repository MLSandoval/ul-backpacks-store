import React, {createRef} from 'react'
import {connect} from 'react-redux'
import {Link as LinkRouter, useRouteMatch, Route} from 'react-router-dom'

import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import './styles/cart_style.css'

import {computeCartTotal, addItemToCart, removeItemFromCart, alterItemQuantity} from '../actions'

import ModalShell from './modal_shell.jsx'

class Cart extends React.Component {
  constructor(props){
    super(props)
    this.CartRef = createRef()
  }

  generateCartList(){
    const products = [...this.props.products]
    
    const cart = Object.entries(this.props.cart.cart_items)
    const cartArr = []
    cart.forEach(([product_uuid, quantity])=>{
      cartArr.push({product_uuid, quantity})
    })

    if(cartArr[0] === undefined){
      return(
        <React.Fragment>
          <Table className="empty-cart">
            <thead>
              <tr>
                <th scope="col-2" ></th>
                <th scope="col-2">Product</th>
                <th scope="col-2" className="text-center">Quantity</th>
                <th scope="col-2" className="text-center">Price</th>
                <th scope="col-2" className="text-center">Total</th>
                <th scope="col-1"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>$0.00</td>
              </tr>
            </tbody>
          </Table>
          <div  className=" col-12 d-flex justify-content-around">
            <h3 className="text-center">Your Cart is Empty :&#40;</h3>
          </div>
        </React.Fragment>
      )
    }else{
      return (
        <React.Fragment>
          <Table className="table table-hover cart-table">
            <thead>
              <tr>
                <th scope="col-2" className="d-none d-sm-table-cell"></th>
                <th scope="col-2">Product</th>
                <th scope="col-2" className="text-center">Quantity</th>
                <th scope="col-2" className="text-center d-none d-sm-table-cell">Price</th>
                <th scope="col-2" className="text-center">Total</th>
                <th scope="col-1"></th>
              </tr>
            </thead>
            <tbody>
            {cartArr.map((product)=>{
              const element = products.filter(currentIteratedProduct => currentIteratedProduct.product_uuid === product.product_uuid)[0]
              return(
                <tr key={product.product_uuid}>
                  <td className="d-none d-sm-table-cell">
                    <img className="row-image" src={element.image_urls[0]}></img>
                  </td>
                  <td>{element.name}</td>
                  <td className="text-center no-wrap-white">
                    <button 
                      type="button" 
                      className="btn"
                      data-uuid={product.product_uuid}
                      data-quantity={product.quantity}
                      onClick={ e => {
                        this.props.alterItemQuantity(this.props.cart.cart_uuid, e.currentTarget.dataset.uuid, 'decrement')
                      }}
                      >-
                    </button>
                    { product.quantity }
                    <button 
                      type="button" 
                      className="btn"
                      data-uuid={product.product_uuid}
                      onClick={ e => { 
                        this.props.alterItemQuantity(this.props.cart.cart_uuid, e.currentTarget.dataset.uuid, 'increment')           
                      }}
                      >+
                    </button>
                  </td>
                  <td className="text-center d-none d-sm-table-cell">${element.price}</td>
                  <td className="text-center">${(element.price*product.quantity).toFixed(2)}</td>
                  <td className="text-center">
                    <button 
                      type="button" 
                      className="btn btn-danger"
                      data-uuid={product.product_uuid}
                      onClick={ e => {this.props.removeItemFromCart(this.props.cart.cart_uuid, e.currentTarget.dataset.uuid)}}
                      >X
                    </button>
                  </td>
                </tr>
              )
            })}
            <tr>
              <td className="d-none d-sm-table-cell"></td>
              <td></td>
              <td></td>
              <td className="font-weight-bold text-right d-none d-sm-table-cell"> </td>
              <td className="text-center"><span className="font-weight-bold">Order Total: </span>${this.props.totalOrderCost.toFixed(2) || 0.00}</td>
              <td></td> 
            </tr>
            <tr>
              <td className="d-none d-sm-table-cell"></td>
              <td></td>
              <td></td>
              <td className="d-none d-sm-table-cell"></td>
              <td className="text-center">
                <Button as={LinkRouter} variant="info" type="button" className="btn-sm" to={`cart/modal/checkout`}>
                  Checkout
                </Button>
              </td>
              <td className="d-none d-sm-table-cell"></td>
            </tr>
            </tbody>
          </Table>
          {/* <div className="d-flex w-100">
            <div className="col-9"></div>
            <Button as={LinkRouter} variant="info" type="button" className="btn-sm col-2" to={`cart/modal/checkout`}>
              Checkout
            </Button>
          </div> */}
          <Route path={`${this.props.match.url}/modal`} component={ModalShell}/>
        </React.Fragment>
      )
    }
  }

  componentDidMount(){
    this.props.computeCartTotal(this.props.cart.cart_items, this.props.products)
  }

  componentDidUpdate(){
    this.props.computeCartTotal(this.props.cart.cart_items, this.props.products)
  }

  render () {
    return (
      <div className="container-fluid cart-container" ref={this.CartRef}>
        <div className="row mr-2 ml-2 justify-content-around pt-3">
          <h3 className="cart-title">Cart</h3>
          {this.generateCartList()} 
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    addToCart: () => {
      dispatch(sortCartTotals)
    }
  }
}

function mapStateToProps(state){
  // console.log('CART state: ', state)
  return {
    products: state.products,
    cart: state.cart,
    totalOrderCost: state.totalOrderCost
  }
}

export default connect(
  mapStateToProps, 
  {
    alterItemQuantity,
    computeCartTotal, 
    addItemToCart, 
    removeItemFromCart
  })(Cart)
