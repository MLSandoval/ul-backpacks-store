/* eslint-disable */

/* eslint-enable */

import React from 'react'
import {connect} from 'react-redux'
import {Route} from "react-router-dom"

import {Element} from 'react-scroll'

import {getProductList, setCurrentProduct, createNewUser, getUserData, getOrders} from '../actions'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global_style.css'

import Landing from './landing.jsx'
import ProductList from './productList.jsx'
import Cart from './cart.jsx'
import Header from './header.jsx'
import Footer from './footer.jsx'
import ProductDetails from './productDetails'
import Orders from './orders'

class App extends React.Component {
  componentDidMount () {
    this.props.getProductList()
    if(!localStorage.user_uuid){
      this.props.createNewUser()
    }else{
      const user_uuid = localStorage.user_uuid
      this.props.getUserData(user_uuid, this.props.products)
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header/>
        <Element className="app-main d-flex flex-column justify-content-between" id="app">
          <div className="main-content flex-grow-1 d-flex " >
            <Route exact path="/" component={Landing}/>
            <Route exact path="/your-orders/" component={Orders}/>
            <Route exact path="/products" component={ProductList}/>
            <Route path="/details/:product_uuid" component={ProductDetails}/> 
            <Route path="/cart" component={Cart}/>
          </div>
          <Footer/>
        </Element>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state){
  return {
    products: state.products.products,
    currentProduct: state.currentProduct,
    userData: state.userData,
    cart: state.cart,
    orders: state.orders,
    appHeight: state.appHeight
  }
}

export default connect(mapStateToProps, {getProductList, setCurrentProduct, createNewUser, getUserData, getOrders})(App)