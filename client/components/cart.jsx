import React from 'react'
import {connect} from 'react-redux'

import './styles/cart_style.css'
import {sortCartTotals} from '../actions'

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
    const sortedCart = this.props.sortedCart

    return (
      products.map((product)=>{
        if(sortedCart[product.id]){
          return(
            <tr key={product.id}>
              <th scope="row">
                <img className="row-image" src={product.images[0]}></img>
                
                </th>
              <td>{product.name}</td>
              <td>{(product.price / 100).toFixed(2)}</td>
              <td>quantity: { sortedCart[product.id] }</td>
            </tr>
          )
        }
      })
    )
  }

  componentDidMount(){
    console.log('cart Component mounted, this.props: ', this.props)
    // console.log('cart Component mounted,')
    this.props.sortCartTotals(this.props.cart)
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
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {this.generateCartList()} 
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
    sortedCart: state.sortedCart
  }
}

export default connect(mapStateToProps, {sortCartTotals})(Cart)

