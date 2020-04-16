import React from 'react'

import { connect } from 'react-redux'

import './styles/landing_style.css'

import { Switch, Route, Link } from "react-router-dom"

class Landing extends React.Component {
  
  render(){
    // console.log('LANDIng props: ', this.props)
    return (
      
        <div className="container-fluid flex-grow-1">
          <div className="row">
          
            <div className="bg bg-1 col-12">BG-1</div>
            <div className="lead text text-1 col-12 radius push-over">
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
            <div className="bg bg-2 col-12 push-over">BG-2</div>
            <div className="lead text text-2 col-12 radius push-over">
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
            <div className="bg bg-3 col-12 push-over">BG-3</div>
        </div>
        </div>
          
      
        
      
    )
  }
}



function mapStateToProps(state) {
  // console.log('LANDING state: ', state);
  return {
    //this becomes a property inside of the props of this component
    view: state.view,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // onViewChangeClick: view => {
    //   // dispatch(SET_VIEW(view));
    // }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
