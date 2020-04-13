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
    //problem code for getting header cart count correct
    // let itemCount = this.getCartItemCount()
    // let itemCount = 0
    return (
      
       
        //   <Navbar className="border w-100" sticky="top" bg="light" expand="sm">
        //   <div className="row flex-direction-row col-12">
        //     <Navbar.Brand className="" href="#home">
        //       <Nav className="">
                // <Nav.Link href="/home">
                //   <Link className="btn" to="/">
                //     <div className="row ">
                //       <div className="logo col-3"></div>
                //       <div className="h2 col-9 align-self-center">UltraLite</div>
                //     </div>
                //   </Link>
                // </Nav.Link>
        //       </Nav>
        //     </Navbar.Brand>
        //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //     <Navbar.Collapse wrap="false" className=" row justify-content-between" id="basic-navbar-nav">
        //       <Nav className="col-lg-10 col-med-9">
                  // <Link className="btn font-weight-bold" to="/our-story">Our Story</Link>
                  // <Link className="btn font-weight-bold" to="/products">Products</Link>
                  // <Link className="btn font-weight-bold" to="/video-review/:product_uuid">Video Reviews</Link>
        //       </Nav>
        //       <Nav className="col-lg-2 col-med-2">
                // <Link className="btn font-weight-bold " to="/cart">
                //   <div className="cart-logo-count-bg row">
                //     <div className="cart-button"></div>
                //     <div className="cart-count">:{ this.getCartItemCount() }</div>
                //   </div>
                // </Link>
        //       </Nav>
        //     </Navbar.Collapse>
        //   </div>
          
        // </Navbar>
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <Nav.Link href="/home">
            <Link className="btn" to="/">
              <div className="row ">
                <div className="logo col-3"></div>
                <div className="h2 col-9 align-self-center">UltraLite</div>
              </div>
            </Link>
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">
            <Link className="btn font-weight-bold" to="/our-story">Our Story</Link>  
            </Nav.Link>
            <Nav.Link href="products">
              <Link className="btn font-weight-bold" to="/products">Products</Link>
            </Nav.Link>
            <Nav.Link href="video-reviews">
              <Link className="btn font-weight-bold" to="/video-review/:product_uuid">Video Reviews</Link>
            </Nav.Link>
          </Nav>
          <div className="nav-link">
            <Link className="btn font-weight-bold" to="/cart">
              <div className="cart-logo-count-bg row">
                <div className="cart-button"></div>
                <div className="cart-count">:{ this.getCartItemCount() }</div>
              </div>
            </Link>
          </div>
            
          
        </Navbar.Collapse>
      </Navbar>
      
      
    )
  }
}

////???
// Header.propTypes = {
//   onViewChangeClick: PropTypes.func.isRequired
// };

function mapDispatchToProps (dispatch) {
  return {
    onViewChangeClick: view => {
      dispatch(SET_VIEW(view));
    }
  }
}

function mapStateToProps(state) {
  console.log('HEADER state: ', state)
  return {
    //this becomes a property inside of the props of this component
    view: state.view,
    cart: state.cart, 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);


 {/* <div className="container row position-fixed landing-header">
          <div className="col-8 row">
            <Link className="btn" to="/">
              <div className="h4">UltraLite</div>
              <div className="logo pr-3 pl-3"></div>
            </Link>
          </div>
          <div className="col-4 row justify-content-end text-nowrap">
            <Link className="btn font-weight-bold" to="/products">Products</Link>
            
            <Link className="btn font-weight-bold" to="/cart">
              <div className="cart-logo-count-bg row">
                <div className="cart-button"></div>
                <div className="cart-count">:{ this.getCartItemCount() }</div>
              </div>
            </Link>
          </div>
        </div> */}