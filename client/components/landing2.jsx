import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Link as LinkRouter } from 'react-router-dom'

import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

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
          <div className="d-flex flex-column position-relative">
          <img className="img-2" src="../../images/gear_sets/gear_set_up_4.jpg" alt=""/> 
            <CardDeck className="product-cards pb-3 d-flex flex-wrap justify-content-around">
              <FadeInSection classesPassed="col-9 p-3">
                <Card as={LinkRouter} to="/products" className="col-12 align-items-center">
                  <Card.Img className="card-img pt-2" variant="top" src="../../images/logos_icons/backpack_icon.png" />
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>Backpacks</Card.Text>
                  </Card.Body>
                  <Card.Footer></Card.Footer>
                </Card>
              </FadeInSection>
              <FadeInSection classesPassed="col-9 p-3">
                <Card className="col-12 align-items-center">
                  <Card.Img className="card-img pt-2" variant="top" src="../../images/logos_icons/tent_icon.png" />
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>Tents</Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted text-sm">Coming Soon</Card.Footer>
                </Card>
              </FadeInSection>
              <FadeInSection classesPassed="col-9 p-3">
                <Card className="col-12 align-items-center">
                  <Card.Img className="card-img pt-2" variant="top" src="../../images/logos_icons/sleeping_bag_icon.png" />
                  <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text>Sleeping Bags</Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted text-sm">Coming Soon</Card.Footer>
                </Card>
              </FadeInSection>
            </CardDeck>
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
