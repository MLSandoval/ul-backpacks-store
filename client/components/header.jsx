import React from 'react'
import { connect } from 'react-redux'
import {Link as LinkRouter, withRouter} from 'react-router-dom'

import "./styles/header_style.css"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

class Header extends React.Component {
  getCartItemCount(){
    let total = 0
    const {cart_items} = this.props.cart

    if(Object.keys(cart_items).length !== 0 && cart_items.constructor === Object){
      for(let key in cart_items){
        total += parseInt(cart_items[key])
      }
    }
    return total || 0
  }
 
  removeActiveOnClick(){
    document.querySelectorAll('.active').forEach((element)=>{
      element.classList.remove('active')
    })
  }

  componentDidUpdate(){
    if(this.props.location.pathname.includes('cart')){
      document.querySelectorAll('.nav-link.active').forEach((element)=>{
        element.classList.remove('active')
      })
      this.classSwitch = 'active'
    }else{
      this.classSwitch = ''
    }
  }

  render(){
    console.log('header props on rerender: ', this.props)
    return (
      
      <Navbar bg="light" sticky="top" expand="md" className="flex-shrink-1 header-settings" name="header" collapseOnSelect={true}>
        <Nav.Link as={LinkRouter} className="btn navbar-brand" to="/">
          <div className="row align-items-center">
            <div className="logo col-1"></div>
            <div className="h2 col-9 brand-text">UltraLite</div>
          </div>
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-between" id="basic-navbar-nav" >
          <Nav className="align-self-center">
            <Nav.Link onClick={()=>{this.removeActiveOnClick()}} as={LinkRouter} title="backpacks" onSelect={() => null} eventKey={1} className="btn font-weight-bold" to="/products">
              Backpacks
            </Nav.Link>
            <Nav.Link onClick={()=>{this.removeActiveOnClick()}} as={LinkRouter} title="sleeping-bags" onSelect={() => null} eventKey={2} className="btn font-weight-bold" to="/products">
              Sleeping Bags
            </Nav.Link>
            <Nav.Link onClick={()=>{this.removeActiveOnClick()}} as={LinkRouter} title="tents" onSelect={() => null} eventKey={3} className="btn font-weight-bold" to="/products">
              Tents
            </Nav.Link>
          </Nav>
          <Nav className="row">
            <Nav.Link onClick={()=>{this.removeActiveOnClick()}} as={LinkRouter} title="your-orders" onSelect={() => null} eventKey={4} className="btn font-weight-bold" to="/your-orders">
              Your Orders
            </Nav.Link>
            <Nav.Link onClick={()=>{this.removeActiveOnClick()}} as={LinkRouter} title="cart" onSelect={() => null} eventKey={4} className={`btn font-weight-bold nav-link ${this.classSwitch}`} to="/cart">
              <div className="cart-logo-count-bg">
                <div className="d-flex justify-content-center">
                  <div className="cart-button"></div>
                  <div className="cart-count">:{ this.getCartItemCount() }</div>
                </div>
              </div>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    view: state.view,
    cart: state.cart, 
  }
}

export default withRouter(connect(mapStateToProps, null)(Header))