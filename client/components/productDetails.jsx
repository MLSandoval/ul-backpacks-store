import React from 'react'
import { connect } from 'react-redux'
import {Route, Link as LinkRouter} from 'react-router-dom'

import {Element, scroller } from 'react-scroll'

import {getProductList, addItemToCart, setCurrentProduct, setModalConfig, computeCartTotal, alterItemQuantity} from '../actions'

import './styles/product_details_style.css'
import BackToTopButton from './back_to_top_button.jsx'
import ModalShell from './modal_shell.jsx'
import Carousel from 'react-bootstrap/Carousel'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

class ProductDetails extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      visibility: false
    }
    this.handleAddToCartClick = this.handleAddToCartClick.bind(this)
    this.scrollFn = this.handleVisibilityChange.bind(this)
  }

  handleVisibilityChange(){
    if(window.pageYOffset > 35){
      this.setState({visibility: true})
    }else{
      this.setState({visibility: false})
    }
  }

  renderProductFeatures () {
    const product = this.props.currentProduct
    let i = 0
    return (
      product.features.map( (element, index) => {
        i++
        return (
        <li key={ index } className={`tab-text-${i}`}>
          {element}
        </li>
        )
      })
    )
  }

  handleAddToCartClick(){
    const keysArr = Object.keys(this.props.cart.cart_items)
    if(keysArr.includes(this.props.currentProduct.product_uuid)){
      this.props.alterItemQuantity(this.props.cart.cart_uuid, this.props.currentProduct.product_uuid, 'increment')
    }else{
      this.props.addItemToCart(this.props.cart, this.props.currentProduct)
    }
    this.props.computeCartTotal(this.props.cart.cart_items, this.props.products, this.props.currentProduct)
  }
  
  handleFeaturesTabClick(){
    setTimeout(document.querySelector('.tab-text-2').scrollIntoView({inline: 'center', block: 'center', behavior: 'smooth'}), 1000)
  }

  componentDidMount(){
    window.scrollTo(0,0)
    document.addEventListener('scroll', this.scrollFn)
  }

  componentWillUnmount(){
    document.removeEventListener('scroll', this.scrollFn)
  }

  render () {
    const product = this.props.currentProduct
    return (
      <div className="product-details container pb-2 flex-grow-1">
        <div className="align-items-center container pt-4 d-flex flex-wrap justify-content-center flex-column flex-sm-row">
          <div className="col-sm-12 col-md-6 carousel-container">
            <Carousel interval={null}>
              {
                product.image_urls.map( (element, index) => {
                  return(
                    <Carousel.Item key={index} className="">
                    <img className="d-block w-100 h-100 carousel-image" src={'../' + element} alt="First slide"/>
                  </Carousel.Item>
                  )
                })
              }
            </Carousel>
          </div>
          <div className="col-sm-12 col-md-6 d-flex flex-column flex-grow-1 justify-content-between align-items-center">
            <div className="d-flex flex-column">
              <h1 className="mb-0 col-12">{product.name}</h1>
              <div className="brand-font-size col-12">by {product.brand}</div>
              <div className="rem-1-font-size mt-4 col-12"><span className="mr-3">{parseInt(product.size_liters).toFixed(0)} L</span> •	<span className="ml-3">{parseInt(product.weight_ounces).toFixed(1)} oz</span></div>
              <div className="short-description mt-4 col-12">{product.short_description}</div>
            </div>
          </div>
          <LinkRouter to={`${this.props.currentProduct.product_uuid}/modal/continue-shopping`} type="button" className="btn btn-secondary col-7 add-to-cart-button mt-4 d-flex align-items-center justify-content-center" onClick={this.handleAddToCartClick}>
              Add To Cart
            </LinkRouter>
          <div className=" col-12 mb-3">
          </div>
        </div>
        <div>
        </div>
        <Element name="tab-scroll"></Element>
        <Tabs className="row pt-2 pb-2"  defaultActiveKey="description" id="uncontrolled-tab-example" 
          onClick={
            ()=>{
              scroller.scrollTo('tab-scroll', {duration: 1000,
                delay: 0,
                smooth: true,
                offset: -60
              })
            }
          }
        >
          <Tab className='pt-1 tab-text' eventKey="description" title="Description">
            {product.long_description}
          </Tab>
          <Tab className='row two-columns tab-text features-tab-content'  eventKey="features" title="Features" >
            <ul>{ this.renderProductFeatures() }</ul>
          </Tab>
        </Tabs>
        {this.state.visibility ? <BackToTopButton className="bring-to-front"/> : null}
        <Route path={`${this.props.match.url}/modal`} component={ModalShell}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
    currentProduct: state.currentProduct,
    cart: state.cart,
    prevY: state.prevY,
    modalConfig: state.modalConfig,
    totalOrderCost: state.totalOrderCost
  }
}

export default connect(mapStateToProps, {addItemToCart, alterItemQuantity, setCurrentProduct, setModalConfig, computeCartTotal, getProductList})(ProductDetails)