/* eslint-disable */
// some code to ignore the rules
/* eslint-enable */

import React from 'react'
import {connect} from 'react-redux'
import { Switch, Route} from "react-router-dom"

import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import {getProductList, setCurrentProduct, createNewUser, getUserData} from '../actions'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global_style.css'
import Landing from './landing.jsx'
import Landing2 from './landing2.jsx'
import ProductList from './productList.jsx'
import Cart from './cart.jsx'
import ModalShell from './modal_shell.jsx'
import Header from './header.jsx'
import Footer from './footer.jsx'
import ProductDetails from './productDetails'
import ThankYou from './thank_you'
import Checkout from './checkout'



class App extends React.Component {

  async componentDidMount () {
    await this.props.getProductList()
    // console.log('app comp didMount, localStorage: ', localStorage)
    if(!localStorage.user_uuid){
      // console.log('user_uuid not in local storage, calling createNewUser')
      this.props.createNewUser()
    }else{
      const user_uuid = localStorage.user_uuid
      console.log('products before getUserData called: ', this.props.products)
      // console.log(' pre-getuser localStorage: ', localStorage)
      setTimeout(()=>{this.props.getUserData(user_uuid, this.props.products)}, 2000)
    }
    
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
        duration: 200,
        delay: 0,
        smooth: 'easeInOutQuart'
      })
    })

    goToContainer.then(() =>
      scroller.scrollTo(targetInApp, {
        duration: 200,
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
          id="app"
        >
          <Header/>
          <div className="main-content flex-grow-1">
            <Route exact path="/" component={Landing2}/>
            {/* <Route exact path="/our-story" component={OurStory}/>
            <Route exact path="/video-review/:product_uuid" component={VideoReviews}/> */}
            <Route exact path="/products" component={ProductList}/>
            <Route path="/details/:product_uuid" component={ProductDetails}/> 
            <Route path="/cart" component={Cart}/>
            {/* <Route path="/" component={Checkout}/> */}
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
  console.log('state in app component: ', state);
  return {
    products: state.products.products,
    currentProduct: state.currentProduct,
    userData: state.userData,
    cart: state.cart
  }
}

export default connect(mapStateToProps, {getProductList, setCurrentProduct, createNewUser, getUserData})(App)
