import React from 'react';

import { connect } from 'react-redux';

import { setView } from '../actions';

import './styles/landing_style.css';
import Header from './header.jsx';
import Footer from './footer.jsx';

import { Switch, Route, Link } from "react-router-dom";

class Landing extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <React.Fragment>
        <Header/>
        <div className="container-fluid">
          <div className="row">
            <div className="bg bg-1 col-12">BG-1</div>
            <div className=" text text-1 col-12">
              Text-1 Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Morbi quis commodo odio aenean sed adipiscing. Arcu dui vivamus
              arcu felis. Ut placerat orci nulla pellentesque dignissim enim sit
              amet venenatis. Euismod elementum nisi quis eleifend quam
              adipiscing vitae proin sagittis. Maecenas ultricies mi eget mauris
              pharetra et. Gravida rutrum quisque non tellus orci. Suscipit
              adipiscing bibendum est ultricies integer quis auctor elit sed.
              Est sit amet facilisis magna etiam tempor orci eu. Lacus sed
              viverra tellus in hac habitasse platea dictumst vestibulum. Rutrum
              tellus pellentesque eu tincidunt tortor aliquam. Porta nibh
              venenatis cras sed felis eget velit.
          </div>
            <div className="bg bg-2 col-12">BG-2</div>
            <div className="text text-2 col-12">
              Text-2 Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Morbi quis commodo odio aenean sed adipiscing. Arcu dui vivamus
              arcu felis. Ut placerat orci nulla pellentesque dignissim enim sit
              amet venenatis. Euismod elementum nisi quis eleifend quam
              adipiscing vitae proin sagittis. Maecenas ultricies mi eget mauris
              pharetra et. Gravida rutrum quisque non tellus orci. Suscipit
              adipiscing bibendum est ultricies integer quis auctor elit sed.
              Est sit amet facilisis magna etiam tempor orci eu. Lacus sed
              viverra tellus in hac habitasse platea dictumst vestibulum. Rutrum
              tellus pellentesque eu tincidunt tortor aliquam. Porta nibh
              venenatis cras sed felis eget velit. Amet mattis vulputate enim
              nulla aliquet porttitor lacus luctus accumsan. Morbi tincidunt
              augue interdum velit euismod in pellentesque massa placerat.
              Convallis a cras semper auctor neque vitae tempus quam. Dictumst
              quisque sagittis purus sit amet volutpat consequat. Nisi quis
              eleifend quam adipiscing vitae proin sagittis nisl. Habitasse
              platea dictumst vestibulum rhoncus est pellentesque elit
              ullamcorper. Ultrices neque ornare aenean euismod elementum nisi.
          </div>
            <div className="bg bg-3 col-12">BG-3</div>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

//takes a single parameter, the entirety of the redux state, whatever this function returns will be added to the components props
function mapStateToProps(state) {
  console.log('state in header.jsx component: ', state);
  // console.log('Redux state in Clock Component: ', state);
  return {
    //this becomes a property inside of the props of this component
    view: state.app.view,


  };
}

//connect takes 2 arguments, the mapStateToProps function, and another
//the connect function returns a function that we curry to the component we are working on, ie we call connect with its parameter, 
//return a function, and then call that function with the curried parameter that follows
//connect takes the second paramter, and object with methods, and then connects them to our components props
export default connect(mapStateToProps, {
  setView: setView
})(Landing);