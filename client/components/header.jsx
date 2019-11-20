import React from 'react';

import { connect } from 'react-redux';
import { viewProductList } from '../actions';
import { push } from "react-router-redux";

import "./styles/header_style.css";

export default function Header(props) {
  return (
      <div className="position-fixed landing-header container-fluid">
        <div className="row">
          <div className="col-9">UltraLite</div>
          <div className="col-3 products-button"
          text="Products"
          onClick={() => {viewProductList()}}/>
        </div>
      </div>
  );
}

//takes a single parameter, the entirety of the redux state, whatever this function returns will be added to the components props
function mapStateToProps(state) {
  console.log('state in clock.js component: ', state);
  // console.log('Redux state in Clock Component: ', state);
  return {
    //this time becomes a property inside of the props of this component
    time: state.clock.time,
    

  };
}

//connect takes 2 arguments, the mapStateToProps function, and another
//the connect function returns a function that we curry to the component we are working on, ie we call connect with its parameter, 
//return a function, and then call that function with the curried parameter that follows
//connect takes the second paramter, and object with methods, and then connects them to our components props
export default connect(mapStateToProps, {
  tick: tick,
  setTextColor: setTextColor
})(Clock);