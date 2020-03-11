import React from 'react'
import {connect} from 'react-redux'

import './styles/cart_style.css'
import {sortCartQuantities} from '../actions'
import {computeCartTotal} from '../actions'

class Cart extends React.Component {


  generateCartList(){
    const sortedCart = this.props.sortedCart
    this.props.computeCartTotal(sortedCart)
    let cartCheck;
    [cartCheck] = this.props.cart

    if(cartCheck === undefined){
      return(
        <React.Fragment>
          <div>
            Cart is empty :&#40;
          </div>
        </React.Fragment>
      )
    }else{
      return (
        <React.Fragment>
          {sortedCart.map((product)=>{
            console.log('sortedCart map, iteration product: ', product)
            return(
              <tr key={product.id}>
                <th scope="row">
                  <img className="row-image" src={product.images[0]}></img>
                </th>
                <td>{product.name}</td>
                <td>Quantity: { product.quantity }</td>
                <td>{(product.price / 100).toFixed(2)}</td>
                <td>{(product.price*product.quantity / 100).toFixed(2)}</td>
                <td>
                  <button 
                    type="button" 
                    class="btn btn-danger"
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
        </React.Fragment>
      )
    }
  }

  componentDidMount(){
    this.props.sortCartQuantities(this.props.cart)
    this.props.computeCartTotal(this.props.sortedCart)
  }

  render () {
    return (
      <div className="pt-4 container">
        <div className="row">
          <h1 className="pt-4">THIS IS THE CART VIEW</h1>
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
              {this.generateCartList()}
            </tbody>
          </table>
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
  console.log('State in Cart component: ', state)
  return {
    products: state.products,
    cart: state.cart,
    sortedCart: state.sortedCart,
    totalOrderCost: state.totalOrderCost
  }
}

export default connect(mapStateToProps, {sortCartQuantities, computeCartTotal})(Cart)
