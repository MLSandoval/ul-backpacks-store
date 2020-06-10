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
          <div className="d-flex flex-wrap">
            <img className="h-100 img img-1" src="../../images/backgrounds/BP_landscape_9.jpg" alt=""/>
            <div className="text col-12 d-flex align-items-center justify-content-around flex-column">
              <h1>Dreaming of an adventure?</h1>
              <div></div>
              <div></div>
            </div>
            <div className=" text text-2 col-12 d-flex align-items-center justify-content-end flex-column">
              <h1>Our gear can make it happen</h1>
            </div>
          <div className="col-12 hori-break"></div>
          <img className=" img-2" src="../../images/gear_sets/gear_set_up_3.jpg" alt=""/> 
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
