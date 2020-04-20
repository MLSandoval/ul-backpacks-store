import React from 'react'
import { connect } from 'react-redux'

import * as Scroll from 'react-scroll'
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import Carousel from 'react-bootstrap/Carousel'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'

import './styles/product_details_style.css'

import { addItemToCart, sortCartQuantities, setCurrentProduct} from '../actions'

class ProductDetails extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tabKey: 'features' //or description
    }
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
  
  componentDidMount(){
    console.log('Product Details Comp this.props: ', this.props)
    this.scrollToTop()
  }
  componentWillUnmount(){
    this.props.setCurrentProduct({})
  }
  

  render () {
    
    const product = this.props.currentProduct
    console.log('product details render, this.props.currentProduct', this.props.currentProduct)
    console.log('product details render, product: ', product)
    return (
      <div className="product-details container pb-5 flex-grow-1">
        <div className="pt-4 row h-100 justify-content-between overflow-auto">
          <div className="col-sm-12 col-lg-6 carousel-container">
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
          <div className="col-sm-12 col-lg-6 row flex-direction-column">
            <div >
              <h2 className="">{product.name}</h2>
              <h6>by {product.brand}</h6>
              <div className="align-self-center">{product.short_description}</div>
            </div>
            <Table className="flat no-border" striped bordered hover>
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
                    <button className="btn btn-secondary col-12" onClick={ ()=>{ this.props.addItemToCart(product)} }>Add To Cart</button>
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
    prevY: state.prevY
  }
}

export default connect(mapStateToProps, {addItemToCart, sortCartQuantities, setCurrentProduct})(ProductDetails)
