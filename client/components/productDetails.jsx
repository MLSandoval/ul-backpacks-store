import React from 'react'
import { connect } from 'react-redux'

class ProductDetails extends React.Component {
  render () {
    console.log('this.props in product details: ', this.props);
    let id = this.props.match.params.productId;

    return (
      <div className="product-details container pt-4">
        <div className="pt-4 row h-100">
          <div className="detail-header container">
            <a className="col-2 btn btn-outline-light back-button" onClick={}>
              <i className="fas fa-arrow-circle-left"></i> Back to Catalog
            </a>
          </div>

          <img className="col-8 " src={this.props.products.image} alt="" />
          <div className=" col-4 mb-3">
            <h2>{this.state.product.name}</h2>
            <h4>${(this.state.product.price / 100).toFixed(2)}</h4>
            <div className="align-self-center">{this.state.product.shortDescription}</div>
            <button onClick={} className="btn btn-secondary">Add To Cart</button>
          </div>
        </div>
        <h5 className="display-5 mt-3">Learn Yourself Here</h5>
        <div>{this.state.product.longDescription}</div>
        <div>{this.state.product.site}</div>
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