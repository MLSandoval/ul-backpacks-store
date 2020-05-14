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

import { getProductList,addItemToCart, sortCartQuantities, setCurrentProduct, setModalConfig, computeCartTotal} from '../actions'

import BackToTopButton from './back_to_top_button.jsx'
import ModalShell from './modal_shell.jsx'

class ProductDetails extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tabKey: 'features' //or description
    }
    this.handleClick = this.handleClick.bind(this)
  }
  renderProductFeatures () {
    const product = this.props.currentProduct

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

  scrollToTop() {
    scroll.scrollToTop();
  }

  scrollToCustom(targetName) {
    scroller.scrollTo(`${targetName}`, {
      duration: 0,
      delay: 0
    })
  }

  scrollToWithContainer(targetInApp) {
    let goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register('end', () => {
        resolve();
        Events.scrollEvent.remove('end');
      });
      scroller.scrollTo('app', {
        duration: 300,
        delay: 0,
        smooth: 'easeInOutQuart'
      })
    })

    goToContainer.then(() =>
      scroller.scrollTo(targetInApp, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        containerId: 'app'
      }));
  }
  handleClick(){
    console.log('prodDetails handle click reached, this.props.cart and this.props.currentProduct: ', this.props.cart, this.props.currentProduct)
    this.props.addItemToCart(this.props.cart, this.props.currentProduct)
    
    this.props.computeCartTotal(this.props.cart)
    // console.log('product details handclick computecart total totalOrderCost: ', this.props.totalOrderCost)
    // this.props.setModalConfig({})
  }
  
  componentDidMount(){
    if(!this.props.currentProduc){
      this.props.getProductList()
    }
    // console.log('Product Details Comp this.props: ', this.props)
    window.scrollTo(0,0)
  }
  // componentDidUpdate(){
  //   console.log('productDetails did update, this.props: ', this.props)
  // }
  // componentWillUnmount(){
  //   this.props.setCurrentProduct({})
  // }
  

  render () {
    
    const product = this.props.currentProduct
    // console.log('product details render, this.props.currentProduct', this.props.currentProduct)
    // console.log('product details render, product: ', product)
    return (
      <div className="product-details container pb-5 flex-grow-1">
        <div className="align-items-center container pt-4 d-flex flex-wrap h-100 justify-content-center">
          <div className="col-sm-12 col-md-6 carousel-container">
            <Carousel interval={null}>
              {
                product.image_urls.map( (element, index) => {
                  return(
                    <Carousel.Item key={index}>
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

        <Tabs className="row pt-2 pb-4" onClick={()=>{scroll.scrollToBottom()}} defaultActiveKey="description" id="uncontrolled-tab-example">
          <Tab className='pt-1' eventKey="description" title="Description">
            {product.long_description}
          </Tab>
          <Tab className='row two-columns'  eventKey="features" title="Features">
            <ul>{ this.renderProductFeatures() }</ul>
          </Tab>
        </Tabs>
        <BackToTopButton/>
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
  // console.log('PRODUCTDETAILS state: ', state);
  return {
    products: state.products,
    currentProduct: state.currentProduct,
    cart: state.cart,
    prevY: state.prevY,
    modalConfig: state.modalConfig,
    totalOrderCost: state.totalOrderCost
  }
}

export default connect(mapStateToProps, {addItemToCart, sortCartQuantities, setCurrentProduct, setModalConfig, computeCartTotal, getProductList})(ProductDetails)
