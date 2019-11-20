import React from 'react';

// import { connect } from 'react-redux';
// import { setView } from '../actions';
// import { push } from "react-router-redux";
import PropTypes from 'prop-types';

import "./styles/header_style.css";

import { Switch, Route, Link } from "react-router-dom";

class Header extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="position-fixed landing-header container-fluid">
        <div className="row">
          <div className="col-9">UltraLite</div>
          <div className="col-3 products-button"
            text="Products"
            // onClick={() => { setView('productListView') }} />
            onClick={onClick}/>
        </div>
      </div>
    );
  }
}

Header.PropTypes = {
  onClick: onClick
};

// //takes a single parameter, the entirety of the redux state, whatever this function returns will be added to the components props
// function mapStateToProps(state) {
//   console.log('state in header.jsx component: ', state);
//   // console.log('Redux state in Clock Component: ', state);
//   return {
//     //this becomes a property inside of the props of this component
//     view: state.app.view,


//   };
// }

//connect takes 2 arguments, the mapStateToProps function, and another
//the connect function returns a function that we curry to the component we are working on, ie we call connect with its parameter, 
//return a function, and then call that function with the curried parameter that follows
//connect takes the second paramter, and object with methods, and then connects them to our components props

// export default connect(mapStateToProps, {
//   setView: setView
// })(Header);