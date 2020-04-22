/* eslint-disable */
// some code to ignore the rules
/* eslint-enable */

import React from 'react'
import {connect} from 'react-redux'
import { Switch, Route} from "react-router-dom"

import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import {getProductList, setCurrentProduct} from '../actions'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global_style.css'
import Landing from './landing.jsx'
import ProductList from './productList.jsx'
import Cart from './cart.jsx'
import ModalShell from './modal_shell.jsx'
import Header from './header.jsx'
import Footer from './footer.jsx'
import Test from './test'
import ProductDetails from './productDetails'
import ThankYou from './thank_you'

import ScrollerProto from './reactScrollerProto.jsx'
import Section from './EXAMPLE.jsx'


class App extends React.Component {

  componentDidMount () {
    this.props.getProductList()
    
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

  render() {
    const {to, staticContext, ...rest} = this.props
    return (
      <React.Fragment>
        
        <Element className="app-main d-flex flex-column"
        //  d-flex flex-direction-column"
          containerId="app"
        >
          <Header/>
          <div className="main-content flex-grow-1">
            <Route exact path="/" component={Landing} />
            <Route exact path="/products" component={ProductList}/>
            <Route path="/details/:productId" component={ProductDetails}/> 
            <Route path="/cart" component={Cart}/>
          </div>
          <Footer/>
        </Element>
        {/* <ScrollerProto/> */}
        {/* <Section></Section> */}
        
        
         
      </React.Fragment>
    )
  }
}

function mapStateToProps(state){
  // console.log('state in app component: ', state);
  return {
    products: state.products.products,
    currentProduct: state.currentProduct
  }
}

export default connect(mapStateToProps, {getProductList, setCurrentProduct})(App)
