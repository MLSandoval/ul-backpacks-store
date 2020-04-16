import React from 'react'
import {connect} from 'react-redux'

import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll} from 'react-scroll'

import './styles/scroller_style.css'


// let scroll = Scroll.animateScroll

class ScrollerProto extends React.Component{
  
  render(){
    return (
      <div className="scroller-container">
        <a to="bottom"
        className="header"
        onClick={animateScroll.scrollToBottom}
        >
          header, scroll to bottom
        </a>
        <div className="body-content">
          body content
          <div 
          className="take-space"
          onClick={this.scrollToBottom}
          >
            IM SPACING
            <Link 
              className="centered-p"
              to="div-15"
            >
              1---go to 15</Link>
          </div>
          <div className="take-space">IM SPACING
            <p className="centered-p">2</p>
          </div>
          <div className="take-space">IM SPACING
            <p className="centered-p">3</p>
          </div>
          <div className="take-space">IM SPACING
            <p className="centered-p">4</p>
          </div>
          <div className="take-space">IM SPACING
            <p className="centered-p">5</p>
          </div>
          <div className="take-space">IM SPACING
            <p className="centered-p">6</p>
          </div>
          <div className="take-space">IM SPACING
            <p className="centered-p">7</p>
          </div>
          <div className="take-space">IM SPACING
            <p className="centered-p">8</p>
          </div>
          <div className="take-space">IM SPACING
            <p className="centered-p">9</p>
          </div>
          <div className="take-space">IM SPACING
            <p className="centered-p">10</p>
          </div>
          <div className="take-space">IM SPACING
            <p className="centered-p">11</p>
          </div>
          <div className="take-space">IM SPACING
            <p className="centered-p">12</p>
          </div>
          <div className="take-space">IM SPACING
            <p className="centered-p">13</p>
          </div>
          <div className="take-space">IM SPACING
            <p className="centered-p">14</p>
          </div>
          <div 
          className="take-space"
          onClick={this.scrollToTop}
          >
            IM SPACING
            <p className="centered-p">15</p>
          </div>
        </div>
        <Link 
        className="footer"
        to="top"
        >
          footer
        </Link>
      </div>
    )
  }
  
}

export default connect(null)(ScrollerProto)