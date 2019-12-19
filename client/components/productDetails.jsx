import React from 'react'
import { connect } from 'react-redux'

class ProductDetails extends React.Component {
  render () {
    return (
      <div>
        <div>
          <h1>THIS IS THE PRODUCT DETAILS VIEW</h1>
          <h1>THIS IS THE PRODUCT DETAILS VIEW</h1>
          <h1>THIS IS THE PRODUCT DETAILS VIEW</h1>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getProductList: () => {
      dispatch();
    }
  }
}

function mapStateToProps(state) {
  console.log('state in productsList component: ', state);
  return {
    products: state.products.products
  }
}

export default connect(mapStateToProps, null)(ProductDetails)