import React from 'react'
import {connect} from 'react-redux'

import './styles/cart_style.css'
import {sortCartQuantities, computeCartTotal, addItemToCart, removeItemFromCart, reduceItemQuantity, increaseItemQuantity} from '../actions'


class Cart extends React.Component {


  generateCartList(){
    const sortedCart = this.props.sortedCart
    // this.props.computeCartTotal(sortedCart)
    let cartCheck;
    [cartCheck] = this.props.cart
    console.log('generateCartList cartCheck: ', cartCheck)

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
        <table className="table  table-hover">
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
          {sortedCart.map((product)=>{
            return(
              <tr key={product.id}>
                <th scope="row">
                  <img className="row-image" src={product.images[0]}></img>
                </th>
                <td>{product.name}</td>
                <td>
                <button 
                    type="button" 
                    className="btn"
                    data-id={product.id}
                    data-quantity={product.quantity}
                    onClick={ e => {
                      console.log('reduce quanity clicked, e.currentTarget.dataset.quantity:', e.currentTarget.dataset.quantity)
                      console.log('reduce quanity clicked, parseInt(e.currentTarget.dataset.quantity):', parseInt(e.currentTarget.dataset.quantity))
                      if(parseInt(e.currentTarget.dataset.quantity) > 1){
                        this.props.reduceItemQuantity(e.currentTarget.dataset.id)
                        this.props.removeItemFromCart(e.currentTarget.dataset.id)
                      }
                    }}
                    >-
                  </button>
                  { product.quantity }
                  <button 
                    type="button" 
                    className="btn"
                    data-id={product.id}
                    onClick={ e => {
                      // let x = e.currentTarget.dataset.id
                      // this.props.increaseItemQuantity(e.currentTarget.dataset.id)
                      console.log('on cart + click, e.currentTarget.dataset.id: ', e.currentTarget.dataset.id)
                      console.log('this.props.products: ', this.props.products )
                      console.log(parseInt(e.currentTarget.dataset.id))
                      console.log('ON CART + CLICK: ', this.props.products.find(element => element.id === parseInt(e.currentTarget.dataset.id)))
                      
                      // this.props.addItemToCart(e.currentTarget.dataset.id)
                      this.props.addItemToCart(this.props.products.find(element => element.id === parseInt(e.currentTarget.dataset.id)))                     
                    }}
                    >+
                  </button>
                </td>
                <td>{(product.price / 100).toFixed(2)}</td>
                <td>{(product.price*product.quantity / 100).toFixed(2)}</td>
                <td>
                  <button 
                    type="button" 
                    className="btn btn-danger"
                    data-id={product.id}
                    onClick={ e => {this.props.removeItemFromCart(e.currentTarget.dataset.id)}}
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
            <td>{this.props.totalOrderCost || 0}</td> 
          </tr>
          </tbody>
        </table>
      )
    }
  }

  componentDidMount(){
    
    this.props.sortCartQuantities(this.props.cart)
    this.props.computeCartTotal(this.props.sortedCart)
  }

  render () {
    console.log()
    return (
      <div className="pt-4 container">
        <div className="row rel">
          <h1 className="pt-4">THIS IS THE CART VIEW</h1>
          {/* <table className="table  table-hover">
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
              {this.generateCartList()}
            </tbody>
          </table> */}
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
  console.log('CART state: ', state)
  return {
    products: state.products,
    cart: state.cart,
    sortedCart: state.sortedCart,
    totalOrderCost: state.totalOrderCost
  }
}

export default connect(mapStateToProps, {sortCartQuantities, computeCartTotal, addItemToCart, removeItemFromCart, reduceItemQuantity, increaseItemQuantity})(Cart)
