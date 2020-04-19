import React from 'react'
import {connect} from 'react-redux'

import * as Scroll from 'react-scroll';
// import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll'
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import './styles/scroller_style.css'


// let scroll = Scroll.animateScroll

class ScrollerProto extends React.Component{
  
  componentDidMount(){
    Events.scrollEvent.register('begin', function(){
      console.log('scroll event begin, arguments: ', arguments)
    })
    Events.scrollEvent.register('end', function () {
      console.log('scroll event register end, arguments: ', arguments);
    });
  }

  componentWillUnmount(){
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  scrollToTop() {
    scroll.scrollToTop();
  }

  scrollToCustom(targetName) {
    scroller.scrollTo(`${targetname}`, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }

  // scrollToWithContainer() {

  //   let goToContainer = new Promise((resolve, reject) => {

  //     Events.scrollEvent.register('end', () => {
  //       resolve();
  //       Events.scrollEvent.remove('end');
  //     });

  //     scroller.scrollTo('container-element', {
  //       duration: 800,
  //       delay: 0,
  //       smooth: 'easeInOutQuart'
  //     });

  //   });

  //   goToContainer.then(() =>
  //     scroller.scrollTo('third-element', {
  //       duration: 800,
  //       delay: 0,
  //       smooth: 'easeInOutQuart',
  //       containerId: 'scroll-container'
  //     }));
  // }


  scrollToWithContainer() {
    let goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register('end', () => {
        resolve();
        Events.scrollEvent.remove('end');
      });
      scroller.scrollTo('app', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    });

    goToContainer.then(() =>
      scroller.scrollTo('top', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        containerId: 'app'
      }));
  }

  // <a className="test1" to="test1" onClick={() => this.scrollToWithContainer()} >Scroll to element within container</a></li>
  
  
  
  render(){
    return (
      <div className="app" id='app' name="top">
        <Element className="header" name="header">
          <Link 
            activeClass="active" 
            className="nav-link-1" 
            to="bottom" 
            // containerId="bottom"
            // spy={true} 
            smooth={true} 
            duration={500}>
            Scroll to bottom
          </Link>
          <Link 
            activeClass="active" 
            className="nav-link-1"  
            to="first-element" 
            // spy={true} 
            smooth={true} 
            duration={500}
            // containerId="body-container"
            >
            Scroll to 1st element
          </Link>
          <Link 
            activeClass="active" 
            className="nav-link-1" 
            to="second-element" 
            // spy={true} 
            smooth={true} 
            duration={500} 
            // containerId="body-container"
            >
            Scroll to 2nd element
          </Link>
          <Link 
            className="nav-link-1"
            activeClass="active"
            to="third-element"
            // spy={true} 
            smooth={true} 
            duration={500} 
            // containerId="body-container"
            >
            Scroll to 3rd element
          </Link>
        </Element>
        {/* <Link 
          activeClass="active" 
          to="firstInsideContainer" 
          spy={true} smooth={true} 
          duration={250} 
          containerId="containerElement" 
          style={{ display: 'inline-block', margin: '20px' }}>
            Go to first element inside container
        </Link> */}
        
        <Element 
          // style={{marginTop:'50px'}} 
          className="body-content" 
          id="body-container">
          <Element className="take-space" name="first-element">first element</Element>
          <Element className="take-space" name="second-element">second element</Element>
          <Element className="take-space" name="third-element">third element</Element>
        </Element>

        <div className="footer">
          <Link 
            name="bottom"
            activeClass="active" 
            className="nav-link-1" 
            to="top"
            containerId='app'
            spy={true} 
            smooth={true} 
            duration={500}
            // style={{marginTop:'50px'}}
            >
            Scroll to Top
          </Link>
          <Link 
            className="nav-link-1" 
            to="header"
            onClick={() => this.scrollToWithContainer()}
            >
            scroll with function to top
          </Link>
          
          <Link 
            name="bottom"
            activeClass="active" 
            className="nav-link-1" 
            to="second-element" 
            spy={true} 
            smooth={true} 
            duration={500}
            // style={{marginTop:'50px'}}
          >
            Scroll to second element
          </Link>
          <Link 
            name="bottom"
            activeClass="active" 
            className="nav-link-1" 
            to="first-element" 
            spy={true} 
            smooth={true} 
            duration={500}
            // style={{marginTop:'50px'}}
          >
            Scroll to first element
          </Link>
        </div>
      </div>
    )
  }
}
  
  


export default connect(null)(ScrollerProto)