import React from 'react';

import { connect } from 'react-redux';
import { setView } from '../actions';
// import { push } from "react-router-redux";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import "./styles/header_style.css";

import Landing from './landing.jsx';

// import { Switch, Route, Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props, {dispatch}){
    super(props);
  }
  
  render(){
    return (
      <div className="position-fixed landing-header container-fluid">
        <div className="row">
          <div className="col-9">UltraLite</div>
          <Link className="btn btn-primary" to="/products-list">Products</Link>
          {/* <Link className="col-3 products-button"
            text="Products"
            onClick={() => { this.props.onViewChangeClick('productListView')}}/> */}
        {/* </Link> */}
        </div>
      </div>
    );
  }
}

////???
Header.PropTypes = {
  onViewChangeClick: PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch) {
  return {
    onViewChangeClick: view => {
      dispatch(SET_VIEW(view));
    }
  };
}

function mapStateToProps(state) {
  console.log('state in header.jsx component: ', state);
  return {
    //this becomes a property inside of the props of this component
    view: state.view,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
