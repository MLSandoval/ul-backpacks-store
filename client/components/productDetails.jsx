import React from 'react'
import { connect } from 'react-redux'

class ProductDetails extends React.Component {
  render () {
    console.log('this.props in product details: ', this.props);
    let id = this.props.match.params.productId;
    console.log(
      "this.props.products[id].images[0]:",
      this.props.products[id].images[0]
    );
      
    return (
      <div className="product-details container pt-4">
        <div className="pt-4 row h-100">
          <div className="container">
            <a className="col-2 btn btn-outline-light back-button">
              <i className=""></i> Back to Catalog
            </a>
          </div>
          <img className="col-8 " src={'../' + this.props.products[id].images[0]} alt="" />
          <div className=" col-4 mb-3">
            <h2>{this.props.products[id].name}</h2>
            <h4>${(this.props.products[id].price / 100).toFixed(2)}</h4>
            <div className="align-self-center">{this.props.products.short_description}</div>
            <button className="btn btn-secondary">Add To Cart</button>
          </div>
        </div>
        <h5 className="display-5 mt-3">Learn Yourself Here</h5>
        <div>{this.props.products[id].long_description}</div>
        <div>{this.props.products[id].brand}</div>
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