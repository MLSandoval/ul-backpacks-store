import React, {createRef} from 'react'
import {connect} from 'react-redux'
import {Link as LinkRouter, useRouteMatch, Route} from 'react-router-dom'

import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import './styles/cart_style.css'

import {sortCartQuantities, computeCartTotal, addItemToCart, removeItemFromCart, reduceItemQuantity, increaseItemQuantity} from '../actions'

import ModalShell from './modal_shell.jsx'

class Cart extends React.Component {
  constructor(props){
    super(props)
    this.CartRef = createRef()
  }

  generateCartList(){
    // const cart = this.props.cart

    const products = [...this.props.products]
    // console.log('PRODUCTS array in cart: ', products)
    
    const cart = Object.entries(this.props.cart.cart_items)
    const cartArr = []
    cart.forEach(([product_uuid, quantity])=>{
      cartArr.push({product_uuid, quantity})
    })
    
    // console.log('cartArr in cart_items: ', cartArr)

    if(cartArr[0] === undefined){
      return(
        <React.Fragment>
          <Table className="empty-cart">
            <thead>
            <tr>
                <th scope="col-2"></th>
                <th scope="col-2">Product</th>
                <th scope="col-2">Quantity</th>
                <th scope="col-2">Price</th>
                <th scope="col-2">Total</th>
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
          <Table className="table table-hover">
            <thead>
              <tr>
                <th scope="col-2"></th>
                <th scope="col-2">Product</th>
                <th scope="col-2">Quantity</th>
                <th scope="col-2">Price</th>
                <th scope="col-2">Total</th>
                <th scope="col-1"></th>
              </tr>
            </thead>
            <tbody>
            {cartArr.map((product)=>{
              // console.log('cart map product: ', product)
              // console.log('cart map PRODUCTS: ', products)
              // console.log('cart map, product.price: ', typeof product.price)
              // console.log('cart map, product.uuid for key: ', product.product_uuid)
              const element = products.filter(currentIteratedProduct => currentIteratedProduct.product_uuid === product.product_uuid)[0]
              // console.log('cart map element: ', element)
              return(
                <tr key={product.product_uuid}>
                  <th scope="row">
                    <img className="row-image" src={element.image_urls[0]}></img>
                  </th>
                  <td>{element.name}</td>
                  <td>
                  <button 
                      type="button" 
                      className="btn"
                      data-uuid={product.product_uuid}
                      data-quantity={product.quantity}
                      onClick={ e => {
                        // console.log('reduceitemquantity CLICKED, uuid: ', e.currentTarget.dataset.uuid)
                        this.props.reduceItemQuantity(e.currentTarget.dataset.uuid)
                        
                      }}
                      >-
                    </button>
                    { product.quantity }
                    <button 
                      type="button" 
                      className="btn"
                      data-uuid={product.product_uuid}
                      onClick={ e => {
                        // console.log('additemtocart CLICKED, uuid: ', e.currentTarget.dataset.uuid)   
                        this.props.increaseItemQuantity(e.currentTarget.dataset.uuid)
                                          
                      }}
                      >+
                    </button>
                  </td>
                  <td>${element.price}</td>
                  <td>${(element.price*product.quantity).toFixed(2)}</td>
                  <td>
                    <button 
                      type="button" 
                      className="btn btn-danger"
                      data-uuid={product.product_uuid}
                      onClick={ e => {this.props.removeItemFromCart(e.currentTarget.dataset.uuid)}}
                      >X
                    </button>
                  </td>
                </tr>
              )
            })}
            <tr>
              <th scope="row">
              </th>
              <td></td>
              <td></td>
              <td>Order Total: </td>
              <td>${this.props.totalOrderCost.toFixed(2) || 0.00}</td> 
            </tr>
            <tr>
              <th scope="row">
              </th>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <LinkRouter to={`cart/modal/checkout`}
                  data-toggle="modal" data-target="#exampleModalCenter">
                  {/* <button 
                    type="button" 
                    className="btn btn-dark"
                    // onClick={()=>{let x = 'someCallBack'}}
                    >Checkout
                  </button>   */}
                  <Button variant="info" type="button" className="btn-sm" >
                    Checkout
                  </Button>
                </LinkRouter>
              </td> 
            </tr>
            </tbody>
          </Table>
          <Route path={`${this.props.match.url}/modal`} component={ModalShell}/>
        </React.Fragment>
      )
    }
  }

  BGScrollModalShown(){
    this.CartRef.current.style.position = 'fixed'
    this.CartRef.current.style.top = `-${window.scrollY}px`
  }

  BGScrollModalhidden(){
    const scrollY = this.CartRef.current.style.top
    this.CartRef.current.style.position = ''
    this.CartRef.current.style.top = ''
    window.scrollTo(0, parseInt(scrollY || '0') * -1)
  }

  componentDidMount(){
    
    this.props.computeCartTotal(this.props.cart.cart_items, this.props.products)
    // console.log('Cart component props: ', this.props)
    // this.props.computeCartTotal(this.props.cart)
    // console.log('cart didmount compute Cart total: ', this.props.totalOrderCost)
  }
  componentDidUpdate(){
    // console.log('cart DidUpdate, this.props.cart: ', this.props.cart)
    this.props.computeCartTotal(this.props.cart.cart_items, this.props.products)
  }

  render () {
    return (
      <div className="container" ref={this.CartRef}>
        <div className="row">
          <h1 className="">Cart</h1>
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
    sortedCart: state.sortedCart,
    totalOrderCost: state.totalOrderCost
  }
}

export default connect(
  mapStateToProps, 
  {
    sortCartQuantities, 
    computeCartTotal, 
    addItemToCart, 
    removeItemFromCart, 
    reduceItemQuantity, 
    increaseItemQuantity
  })(Cart)
