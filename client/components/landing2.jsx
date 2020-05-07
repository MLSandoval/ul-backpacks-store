import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Link as LinkRouter } from 'react-router-dom'

import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import Button from 'react-bootstrap/Button'

import FadeInSection from './fade_in_section.jsx'
import './styles/landing2_style.css'

class Landing extends React.Component {

  scrollToTop() {
    // scroll.scrollTop.duration = 0;
    scroll.scrollToTop()
  }

  scrollToCustom(targetName) {
    scroller.scrollTo(`${targetName}`, {
      duration: 0,
      delay: 0
    })
  }

  componentDidMount(){
    window.scrollTo(0, 0)
  }
  
  render(){
    return (
      
        <div className="landing-top">
          <div className="d-flex parallax-container">
            <div className="col-3 text left-text">left text</div>
            <div className="bg-1 bg col-9"></div>
          </div>
          <div className="horizontal-divider"></div>
          <div className="d-flex parallax-container">
            <div className="col-9 bg bg-2"></div>
            <div className="col-3 text right-text">right text</div>
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
