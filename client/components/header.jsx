import React from 'react'
import { connect } from 'react-redux'
import {Link as LinkRouter, withRouter} from 'react-router-dom'

import * as Scroll from 'react-scroll'
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import "./styles/header_style.css"

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

// import { Switch, Route, Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props){
    super(props)
  }
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

  componentDidMount(){}
  componentDidUpdate(){
    if(this.props.location.pathname.includes('cart')){
      document.querySelectorAll('.active').forEach((element)=>{
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
        <Navbar 
          onClick={()=>{this.removeActiveOnClick()}}
          // toggleNavKey={4} 
          bg="light" 
          sticky="top" 
          expand="md" 
          className="flex-shrink-1 header-settings" 
          name="header" 
          collapseOnSelect={true}
          // onToggle={this.setNavExpanded}
          // expanded={this.state.navExpanded}
        >
          <Nav.Link as={LinkRouter} className="btn navbar-brand" to="/">
            <div className="row align-items-center">
              <div className="logo col-1"></div>
              <div className="h2 col-9 brand-text">UltraLite</div>
            </div>
          </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* <div className="header-update"></div> */}
        <Navbar.Collapse className="justify-content-between" id="basic-navbar-nav" >
          <Nav className="align-self-center">
            <Nav.Link as={LinkRouter} title="backpacks" onSelect={() => null} eventKey={1} className="btn font-weight-bold" to="/products">
              Backpacks
            </Nav.Link>
            <Nav.Link as={LinkRouter} title="sleeping-bags" onSelect={() => null} eventKey={2} className="btn font-weight-bold" to="/products">
              Sleeping Bags
            </Nav.Link>
            <Nav.Link as={LinkRouter} title="tents" onSelect={() => null} eventKey={3} className="btn font-weight-bold" to="/products">
              Tents
            </Nav.Link>
          </Nav>
          <Nav className="row">
            <Nav.Link as={LinkRouter} title="your-orders" onSelect={() => null} eventKey={4} className="btn font-weight-bold" to="/your-orders">
              Your Orders
            </Nav.Link>
            {/* <Nav.Link as={LinkRouter} title="reviews" onSelect={() => null} eventKey={3} className="btn font-weight-bold" to="/video-review/:product_uuid">
              Reviews
            </Nav.Link> */}
            <Nav.Link as={LinkRouter} title="cart" onSelect={() => null} eventKey={4} className={`btn font-weight-bold nav-link ${this.classSwitch}`} to="/cart">
              <div className="cart-logo-count-bg">
                <div ></div>
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

function mapDispatchToProps (dispatch) {
  return {
    onViewChangeClick: view => {
      dispatch(SET_VIEW(view));
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    view: state.view,
    cart: state.cart, 
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
