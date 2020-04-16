import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

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
    this.cartCount = null
  }
  getCartItemCount(){
    let total = 0
    if(this.props.cart[0])
      this.props.cart.forEach(element=>{total += element.quantity})
    return total || 0
  }

  componentDidUpdate(prevProps){
    
    
  }

  componentDidMount(){

  }

  render(){
    return (
        <Navbar bg="light" sticky="top" expand="md" className=" header-size">
          <Link className="btn navbar-brand" to="/">
            <div className="row ">
              <div className="logo col-3"></div>
              <div className="h2 col-9 align-self-center">UltraLite</div>
            </div>
          </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link className="btn font-weight-bold nav-link" to="/our-story">Our Story</Link>  
            <Link className="btn font-weight-bold nav-link" to="/products">Products</Link>
            <Link className="btn font-weight-bold nav-link" to="/video-review/:product_uuid">Video Reviews</Link>
          </Nav>
          <Link className="btn font-weight-bold nav-link" to="/cart">
            <div className="cart-logo-count-bg row">
              <div className="cart-button"></div>
              <div className="cart-count">:{ this.getCartItemCount() }</div>
            </div>
          </Link>
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

function mapStateToProps(state) {
  // console.log('HEADER state: ', state)
  return {
    //this becomes a property inside of the props of this component
    view: state.view,
    cart: state.cart, 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
