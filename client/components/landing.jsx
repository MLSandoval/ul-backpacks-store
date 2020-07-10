import React from 'react'
import { connect } from 'react-redux'
import {Link as LinkRouter } from 'react-router-dom'

import './styles/landing_style.css'

class Landing extends React.Component {
  componentDidMount(){
    window.scrollTo(0, 0)
  }

  render(){
    return (
      <div className="landing-top">
        <div className="d-flex flex-wrap position-relative">
          <img className="img-1" src="../../images/backgrounds/BP_landscape_9.jpg" alt=""/>
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
              <h3 className="shop-text  pb-2">Shop Now</h3>
              <div className="container">
                <div className="tile-container row justify-content-around flex-column">
                  <LinkRouter className="col-12 mt-4 link-tile" to="/products">
                    <h2 className="category-text">Backpacks</h2>
                    <img className="tile-image" src="../../images/logos_icons/backpack_tile.jpg" alt=""/>
                  </LinkRouter>
                  <div className="col-12 mt-4">
                    <h2 className="category-text">Tents</h2>
                    <img className="tile-image" src="../../images/logos_icons/tent_tile.jpg" alt=""/>
                  </div>
                  <div className="col-12 mt-4">
                    <h2 className="category-text">Sleeping Bags</h2>
                    <img className="tile-image" src="../../images/logos_icons/sleepingbag_tile.jpg" alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    appHeight: state.appHeight
  }
}

export default connect(mapStateToProps, null)(Landing)