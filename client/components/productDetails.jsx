import React from 'react'
import { connect } from 'react-redux'

import {Route, Link as LinkRouter} from 'react-router-dom'

import * as Scroll from 'react-scroll'
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import Carousel from 'react-bootstrap/Carousel'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'

import './styles/product_details_style.css'

import {getProductList, addItemToCart, setCurrentProduct, setModalConfig, computeCartTotal, alterItemQuantity} from '../actions'

import BackToTopButton from './back_to_top_button.jsx'
import ModalShell from './modal_shell.jsx'

class ProductDetails extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tabKey: 'features', //or description
      visibility: false
    }
    this.handleClick = this.handleClick.bind(this)
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

  handleClick(){
    const keysArr = Object.keys(this.props.cart.cart_items)
    if(keysArr.includes(this.props.currentProduct.product_uuid)){
      this.props.alterItemQuantity(this.props.cart.cart_uuid, this.props.currentProduct.product_uuid, 'increment')
    }else{
      this.props.addItemToCart(this.props.cart, this.props.currentProduct)
    }
    this.props.computeCartTotal(this.props.cart.cart_items, this.props.products, this.props.currentProduct)
  }
  
  handleFeaturesTabClick(){
    console.log('handleFeaturesTabClick called')
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
                    <img
                      className="d-block w-100 h-100 carousel-image"
                      src={'../' + element}
                      alt="First slide"
                    />
                    <Carousel.Caption>
                      <p></p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  )
                })
              }
            </Carousel>
          </div>
          <div className="col-sm-12 col-md-6 d-flex flex-column flex-grow-1 justify-content-between">
            <div className=''>
              <h2 className="">{product.name}</h2>
              <h6>by {product.brand}</h6>
              <div className="align-self-center">{product.short_description}</div>
            </div>
            <Table className="flat no-border" hover>
              <thead>
              </thead>
              <tbody>
                <tr>
                  <td>Price</td>
                  <td>${product.price}</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>{parseInt(product.weight_ounces).toFixed(1)} Oz</td>
                </tr>
                <tr>
                  <td>Material</td>
                  <td>{product.material}</td>
                </tr>
                <tr>
                  <td>Size</td>
                  <td>{parseInt(product.size_liters).toFixed(0)}L</td>
                </tr>
                <tr>
                  <td className="" colSpan="2">
                    <LinkRouter to={`${this.props.currentProduct.product_uuid}/modal/continue-shopping`} type="button" className="btn btn-secondary col-12" 
                      onClick={this.handleClick}>Add To Cart</LinkRouter>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className=" col-12 mb-3">
            <br></br>
          </div>
        </div>
        <div>
        </div>
        <Element name="tab-scroll"></Element>
        <Tabs className="row pt-2 pb-2"  defaultActiveKey="description" id="uncontrolled-tab-example" 
          onClick={
            ()=>{
              scroller.scrollTo('tab-scroll', {duration: 1000,
                delay: 50,
                smooth: true,
                offset: -60
              })

                console.log('tab container clicked')
              // scroll.scrollToBottom()
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

function mapDispatchToProps(dispatch) {
  return {
    addItemToCart: () => {
      dispatch(addItemToCart)
    }
  }
}

function mapStateToProps(state) {
  // console.log('PRODUCTDETAILS state: ', state)
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
