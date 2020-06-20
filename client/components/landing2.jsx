import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Link as LinkRouter } from 'react-router-dom'

import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Jumbotron from 'react-bootstrap/Jumbotron'

import FadeInSection from './fade_in_section.jsx'
import './styles/landing2_style.css'

class Landing extends React.Component {
  constructor(props){
    super(props)
    this.scrollPosition

    this.handleScroll = this.handleScroll.bind(this)
  }
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

  handleScroll(){

  }

  componentDidMount(){
    window.scrollTo(0, 0)

  }

  componentWillUnmount(){

  }
  
  render(){
    return (
      <div className="landing-top">
        <div className="d-flex flex-wrap position-relative">
          <img className="img" src="../../images/backgrounds/BP_landscape_9.jpg" alt=""/>
          <div className="text col-12 d-flex align-items-center justify-content-around flex-column">
            <h1>Dreaming of an adventure?</h1>
            <div></div>
            <div></div>
          </div>
            <div className=" text text-2 col-12 d-flex align-items-center justify-content-end flex-column">
              <h1>Let our gear make it happen</h1>
            </div>
          <div className="col-12 hori-break"></div>
          <div className="d-flex flex-column position-relative align-items-center">
            <img className="img-2" src="../../images/gear_sets/gear_set_up_4.jpg" alt=""/>
            <div className="on-top-image d-flex align-items-center justify-content-around flex-column">
              <h3 className="shop-text pt-3 pb-2">Shop Now</h3>
              <Jumbotron fluid>
                <div className="container">
                  <div className="row justify-content-around">
                    <LinkRouter className="col-4" to="/products">
                      <h1>Backpacks</h1>
                      <img className="tile-image image-fluid" src="../../images/logos_icons/backpack_tile.jpg" alt=""/>
                    </LinkRouter>
                    <div className="col-4">
                      <h1>Tents</h1>
                      <img className="tile-image image-fluid" src="../../images/logos_icons/tent_tile.jpg" alt=""/>
                    </div>
                    <div className="col-4">
                      <h1>Sleeping Bags</h1>
                      <img className="tile-image image-fluid" src="../../images/logos_icons/sleepingbag_tile.jpg" alt=""/>
                    </div>
                  </div>
                </div>
              </Jumbotron>
            </div>
          </div>
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
