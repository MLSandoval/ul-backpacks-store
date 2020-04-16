import React, {createRef} from 'react'
import {connect} from 'react-redux'
import {Link, useRouteMatch, Route} from 'react-router-dom'

import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import Table from 'react-bootstrap/Table'
import './styles/cart_style.css'

import {sortCartQuantities, computeCartTotal, addItemToCart, removeItemFromCart, reduceItemQuantity, increaseItemQuantity} from '../actions'

import ModalShell from './modalShell.jsx'

class Cart extends React.Component {
  constructor(props){
    super(props)
    this.CartRef = createRef()
  }

  generateCartList(){
    const cart = this.props.cart
    let cartCheck;
    [cartCheck] = this.props.cart

    if(cartCheck === undefined){
      return(
        <React.Fragment>
          <div className="empty-cart">
            Cart is empty :&#40;
          </div>
        </React.Fragment>
      )
    }else{
      return (
        <React.Fragment>
          <Table className="table table-hover">
            <thead>
              <tr>
                <th scope="col-2">Image</th>
                <th scope="col-2">Product</th>
                <th scope="col-2">Quantity</th>
                <th scope="col-2">Price</th>
                <th scope="col-2">Total</th>
                <th scope="col-1"></th>
              </tr>
            </thead>
            <tbody>
            {cart.map((product)=>{
              console.log('cart map for row, product: ', product)
              console.log('cart map, product.price: ', typeof product.price)
              console.log('cart map, product.uuid for key: ', product.product_uuid)
              return(
                <tr key={product.product_uuid}>
                  <th scope="row">
                    <img className="row-image" src={product.image_urls[0]}></img>
                  </th>
                  <td>{product.name}</td>
                  <td>
                  <button 
                      type="button" 
                      className="btn"
                      data-uuid={product.uuid}
                      data-quantity={product.quantity}
                      onClick={ e => {
                        this.props.removeItemFromCart(e.currentTarget.dataset.uuid)
                      }}
                      >-
                    </button>
                    { product.quantity }
                    <button 
                      type="button" 
                      className="btn"
                      data-id={product.id}
                      onClick={ e => {
                        this.props.addItemToCart(this.props.products.find(element => element.uuid === e.currentTarget.dataset.uuid))                     
                      }}
                      >+
                    </button>
                  </td>
                  <td>${product.price}</td>
                  <td>${(product.price*product.quantity).toFixed(2)}</td>
                  <td>
                    <button 
                      type="button" 
                      className="btn btn-danger"
                      data-id={product.id}
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
                <Link to={`cart/modal/checkout`}
                  data-toggle="modal" data-target="#exampleModalCenter">
                  {/* <button 
                    type="button" 
                    className="btn btn-dark"
                    // onClick={()=>{let x = 'someCallBack'}}
                    >Checkout
                  </button>   */}
                  <button type="button" className="btn btn-primary" >
                    Checkout
                  </button>
                </Link>
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
    this.props.computeCartTotal(this.props.cart)
    // console.log('Cart component props: ', this.props)
  }
  componentDidUpdate(){
    this.props.computeCartTotal(this.props.cart)
  }

  render () {
    return (
      <div className="container flex-grow-1" ref={this.CartRef}>
        <div className="row">
          <h1 className="">THIS IS THE CART VIEW</h1>
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
