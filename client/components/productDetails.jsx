import React from 'react'
import { connect } from 'react-redux'

import Carousel from 'react-bootstrap/Carousel'
import './styles/product_details_style.css'
import { addToCart } from '../actions'

class ProductDetails extends React.Component {

  componentDidMount(){
    let id = this.props.match.params.productId
    let product = this.props.products[id]

  }

  renderProductFeatures () {
    let id = this.props.match.params.productId
    let product = this.props.products[id]
    console.log('features id: ', this.props.match.params.productId)
    console.log('features product: ', this.props.products[id])

    return (
      product.features.map( (element, index) => {
        return (
        <li key={ index }>
          {element}
        </li>
        )
      })
    )
  }

  render () {
    console.log('addToCart function: ', addToCart(1))
    console.log('this.props in product details: ', this.props);
    let id = this.props.match.params.productId
    let product = this.props.products[id]
    let prevCart =  this.props.cart
    console.log('prevCart: ', prevCart)
    // console.log(
    //   "this.props.products[id].images[0]:",
    //   this.props.products[id].images[0]
    // );
      
    return (
      <div className="product-details container pt-4">
        <div className="pt-4 row h-100 overflow-auto">
          
            {/* <a className="col-2 btn btn-outline-light back-button">
              <i className=""></i> Back to Catalog
            </a> */}
          
          <div className="col-8">
            <h2 className="">{this.props.products[id].name}</h2>
            <h6>by {this.props.products[id].brand}</h6>
          </div>
          <div className="col-4 row flex-column justify-content-end">
            <h4 className="align-self-center">${(this.props.products[id].price / 100).toFixed(2)}</h4>
            <button className="btn btn-secondary" onClick={ ()=>{ this.props.addToCart(prevCart, id) } }>Add To Cart</button>
          </div>
          <div className="col-8 carousel-container">
            <Carousel interval={false}>
              {
                product.images.map( (element, index) => {
                  return(
                    <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={'../' + element}
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <h3>{index + 1}</h3>
                      <p></p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  )
                })
              }
            </Carousel>
          </div>

          <div className=" col-4 mb-3">
            {/* <h2 className="align-self-right">{this.props.products[id].name}</h2> */}
            {/* <h4 className="align-self-right">${(this.props.products[id].price / 100).toFixed(2)}</h4> */}
            <div className="align-self-center">{product.short_description}</div>
            
            <div>
              {this.props.products[id].long_description}
            </div>
          </div>
        </div>
        <h5 className="display-5 mt-3">Features</h5>
        <div>
          <ul>{ this.renderProductFeatures() }</ul>
        </div>
        
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addToCart: () => {
      dispatch(addToCart)
    }
  }
}

function mapStateToProps(state) {
  console.log('state in productsDetails component: ', state);
  return {
    products: state.products.products,
    currentProduct: state.currentProduct,
    cart: state.cart
  }
}

export default connect(mapStateToProps, {addToCart})(ProductDetails)
