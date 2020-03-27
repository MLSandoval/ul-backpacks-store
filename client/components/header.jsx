import React from 'react'

import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import "./styles/header_style.css"

import Landing from './landing.jsx'

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
      <div className="position-fixed landing-header container-fluid">
        <div className="row ">
          <div className="col-8 row">
            <Link className="btn" to="/">
              <div className="h4">UltraLite</div>
              <div className="logo pr-3 pl-3"></div>
            </Link>
          </div>
          <div className="col-4 row justify-content-end text-nowrap">
            <Link className="btn font-weight-bold" to="/products">Products</Link>
            {/* <Link className="btn font-weight-bold" to="/test">Test</Link> */}
            <Link className="btn font-weight-bold" to="/cart">
              <div className="cart-logo-count-bg row">
                <div className="cart-button"></div>
                <div className="cart-count">:{ this.getCartItemCount() }</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
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
