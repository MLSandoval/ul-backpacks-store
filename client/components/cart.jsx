import React from 'react'
import {connect} from 'react-redux'

import './styles/cart_style.css'

class Cart extends React.Component {

  generateCartList(cart){

    return (
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    )
  }

  render () {
    return (
      <div className="pt-4">
        <h1 className="pt-4">THIS IS THE CART VIEW</h1>
        {this.generateCartList()}
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log('State in Cart component: ', state)
  return {
    products: state.products,
    cart: state.cart
  }
}

export default connect(mapStateToProps, null)(Cart)

