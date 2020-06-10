/* eslint-disable */
// some code to ignore the rules
/* eslint-enable */

import React from 'react'
import {connect} from 'react-redux'
import { Switch, Route} from "react-router-dom"

import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import {getProductList, setCurrentProduct, createNewUser, getUserData, getOrders} from '../actions'

import Collapse from 'react-bootstrap/Collapse'
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
import Orders from './orders'

class App extends React.Component {
  constructor(props){
    super(props)
    this.lastScrollTop = 0
    this.state = {
      showHeader: true,
      
    }
    // this.hideAndRevealHeader = this.hideAndRevealHeader.bind(this)
  }

  // hideAndRevealHeader(){
  //   console.log('hideAndRevaelheader lastScrollTop at start of function: ', this.lastScrollTop)
  //   console.log('hideAndRevaelheader pageYoffset at start of function: ', window.pageYOffset)
  //   if(window.pageYOffset >= this.lastScrollTop){
  //     //show header
  //     this.setState({showHeader: false})
  //     this.lastScrollTop = window.pageYOffset
  //   }else{
  //     //hideheader
  //     this.setState({showHeader: true})
  //     this.lastScrollTop = window.pageYOffset
  //   }
  // }

  componentDidMount () {
    this.props.getProductList()
     
    if(!localStorage.user_uuid){
      this.props.createNewUser()
    }else{
      const user_uuid = localStorage.user_uuid
      this.props.getUserData(user_uuid, this.props.products)
    }

    // document.addEventListener('scroll', ()=>{this.hideAndRevealHeader()})
  }

  componentWillUnmount(){
    // document.removeEventListener('scroll', ()=>{this.hideAndRevealHeader()})
  }

  render() {
    return (
      <React.Fragment>
        <Header/>
        <Element className="app-main d-flex flex-column"id="app">
          <div className="main-content flex-grow-1">
            <Route exact path="/" component={Landing2}/>
            <Route exact path="/your-orders/" component={Orders}/>
            <Route exact path="/products" component={ProductList}/>
            <Route path="/details/:product_uuid" component={ProductDetails}/> 
            <Route path="/cart" component={Cart}/>
            {/* <Route path="/" component={Orders}/> */}
          </div>
          <Footer/>
        </Element>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state){
  console.log('state in APP component: ', state);
  return {
    products: state.products.products,
    currentProduct: state.currentProduct,
    userData: state.userData,
    cart: state.cart,
    orders: state.orders
  }
}

export default connect(mapStateToProps, {getProductList, setCurrentProduct, createNewUser, getUserData, getOrders})(App)
