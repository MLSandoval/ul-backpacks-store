import React from 'react';

import { connect } from 'react-redux';
// import { setView } from '../actions';
// import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import "./styles/header_style.css";

import Landing from './landing.jsx';

// import { Switch, Route, Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props, {dispatch}){
    super(props);
  }
  
  render(){
    let itemCount = 0;
    return (
      <div className="position-fixed landing-header container-fluid">
        <div className="row ">
          <div className="col-8 row">
            <Link className="btn" to="/">
              <div className="h4">UltraLite</div>
              <div className="logo pr-3 pl-3"></div>
            </Link>
          </div>
          <div className="col-4 row justify-content-end">
            <Link className="btn font-weight-bold" to="/products">Products</Link>
            <Link className="btn font-weight-bold" to="/test">Test</Link>
            <Link className="btn font-weight-bold" to="/cart">
              <div className="cart-button"></div>
              <div className="cart-count">: {itemCount}</div>
            </Link>
          </div>
        </div>
      </div>
    );
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
  };
}

function mapStateToProps(state) {
  return {
    //this becomes a property inside of the props of this component
    view: state.view,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
