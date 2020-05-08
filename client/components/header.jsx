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

// import { Switch, Route, Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props){
    super(props)
  }
  getCartItemCount(){
    let total = 0
    if(this.props.cart[0])
      this.props.cart.forEach(element=>{total += element.quantity})
    return total || 0
  }
  componentDidUpdate(prevProps){}
  componentDidMount(){}
  removeActiveOnClick(){
    document.querySelectorAll('.active').forEach((element)=>{
      element.classList.remove('active')
    })
  }

  componentDidMount(){
    // setTimeout(this.setState({className: 'header-update'}, ()=>{console.log('setState callback triggered, this.state.className after: ', this.state.className)}), 300)
  }
  componentDidUpdate(){
    console.log('header componenet componenet did update props: ', this.props)
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
    return (
      <div className="container">
<Navbar 
          onClick={()=>{this.removeActiveOnClick()}}
          // toggleNavKey={4} 
          bg="light" 
          fixed="top" 
          expand="md" 
          className="flex-shrink-1 header-size" 
          name="header" 
          collapseOnSelect={true}
          // onToggle={this.setNavExpanded}
          // expanded={this.state.navExpanded}
        >
          <Nav.Link as={LinkRouter} className="btn navbar-brand" to="/">
            <div className="row ">
              <div className="logo col-3"></div>
              <div className="h2 col-9 align-self-center">UltraLite</div>
            </div>
          </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* <div className="header-update"></div> */}
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav" >
          <Nav
            className="row"
          >
            <Nav.Link as={LinkRouter} title="story" onSelect={() => null} eventKey={1} className="btn font-weight-bold" to="/our-story">
              Our Story
            </Nav.Link>
            <Nav.Link as={LinkRouter} title="products" onSelect={() => null} eventKey={2} className="btn font-weight-bold" to="/products">
              Products
            </Nav.Link>
            <Nav.Link as={LinkRouter} title="reviews" onSelect={() => null} eventKey={3} className="btn font-weight-bold" to="/video-review/:product_uuid">
              Reviews
            </Nav.Link>
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
          
          
          
          
          
          {/* <LinkRouter className="btn font-weight-bold" to="/cart" eventKey={4}>
            <div className="cart-logo-count-bg row">
              <div className="cart-button"></div>
              <div className="cart-count">:{ this.getCartItemCount() }</div>
            </div>
          </LinkRouter> */}
          
          
        </Navbar.Collapse>
      </Navbar>
      </div>
        
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

function mapStateToProps(state) {
  // console.log('HEADER state: ', state)
  return {
    //this becomes a property inside of the props of this component
    view: state.view,
    cart: state.cart, 
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
