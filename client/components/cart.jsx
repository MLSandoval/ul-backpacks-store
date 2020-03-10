import React from 'react'
import {connect} from 'react-redux'

import './styles/cart_style.css'
import {sortCartQuantities} from '../actions'
import {computeCartTotal} from '../actions'

class Cart extends React.Component {

  // sortCartTotals(cart){
  //   const sortedCart = cart.reduce((accumulator, currentValue)=>{
  //     if(!!accumulator[currentValue] === false){
  //       accumulator[currentValue]=1
  //     }else{
  //       accumulator[currentValue]+=1
  //     }
  //     return accumulator
  //   }, {})

    //or more elegant way to count elements in the array
    // const sortedCart = cart.reduce((map, product) => ({
    //   ...map,
    //   [product]: (map[product] || 0) + 1,
    // }), {})
  // }

  generateCartList(){
    const products = this.props.products
    console.log('generateCartList products: ', products)
    const sortedCart = this.props.sortedCart
    // this.props.sortCartTotals(this.props.cart)
    this.props.computeCartTotal(sortedCart)

    return (
      products.map((product)=>{
        if(sortedCart[product.id]){
          return(
            <tr key={product.id}>
              <th scope="row">
                <img className="row-image" src={product.images[0]}></img>
              </th>
              <td>{product.name}</td>
              <td>quantity: { sortedCart[product.id] }</td>
              <td>{(product.price / 100).toFixed(2)}</td>
              <td>{(product.price*sortedCart[product.id] / 100).toFixed(2)}</td>
              {/* {this.props.computeCartTotal((product.price*sortedCart[product.id] / 100).toFixed(2))} */}
            </tr>
          )
        }
      })
    )
  }

  componentDidMount(){
    console.log('cart Component mounted, this.props: ', this.props)
    // console.log('cart Component mounted,')
    this.props.sortCartQuantities(this.props.cart)
    //need to get quantity * individual cost pushed up to store before calling total order cost, may require
    //another action/reducer set
    // this.props.totalOrderCost()
  }

  render () {
    return (
      <div className="pt-4">
        <h1 className="pt-4">THIS IS THE CART VIEW</h1>
        <table className="table">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {this.generateCartList()}
          <tr>
            <th scope="row">
            </th>
            <td></td>
            <td></td>
            <td>Order Total: </td>
            <td>{this.props.totalOrderCost}</td> 
          </tr>
        </tbody>
      </table>
      </div>
    )
  }
}

// function mapDispatchToProps(dispatch){
//   return {
//     addToCart: () => {
//       dispatch(sortCartTotals)
//     }
//   }
// }

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
