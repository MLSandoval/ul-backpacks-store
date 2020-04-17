import React from 'react'
import {connect} from 'react-redux'

import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll'

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

  scrollTo() {
    scroller.scrollTo('scroll-to-element', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    })
  }

  scrollToWithContainer() {

    let goToContainer = new Promise((resolve, reject) => {

      Events.scrollEvent.register('end', () => {
        resolve();
        Events.scrollEvent.remove('end');
      });

      scroller.scrollTo('container-element', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });

    });

    goToContainer.then(() =>
      scroller.scrollTo('div-15', {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart',
        containerId: 'scroll-container'
      }));
  }

  render(){
    return (
      <div className="app">
        <Link 
            activeClass="active" 
            className="nav-link-1" 
            to="top" 
            // spy={true} 
            smooth={true} 
            duration={500}
            style={{marginTop:'50px'}}>
            Scroll to Top
          </Link>
          <Link 
            activeClass="active" 
            className="nav-link-1" 
            to="third-element" 
            // spy={true} 
            smooth={true} 
            duration={500} 
            containerId="body-container">
            Scroll to 3rd element
          </Link>
        <Element className="header" name="top">
          <Link 
            activeClass="active" 
            className="nav-link-1" 
            to="top" 
            // spy={true} 
            smooth={true} 
            duration={500}>
            Scroll to Top
          </Link>
          <Link 
            activeClass="active" 
            className="nav-link-1"  
            to="first-element" 
            // spy={true} 
            smooth={true} 
            duration={500}
            containerId="body-container">
            Scroll to 1st element
          </Link>
          <Link 
            activeClass="active" 
            className="nav-link-1" 
            to="second-element" 
            // spy={true} 
            smooth={true} 
            duration={500} 
            containerId="body-container">
            Scroll to 2nd element
          </Link>
          <Link 
            activeClass="active" 
            className="nav-link-1" 
            to="third-element" 
            // spy={true} 
            smooth={true} 
            duration={500} 
            containerId="body-container">
            Scroll to 3rd element
          </Link>
        </Element>

        <Element style={{marginTop:'50px'}} className="body-content" name="body-container">
          <Element className="take-space" name="first-element">first element</Element>
          <Element className="take-space" name="second-element">second element</Element>
          <Element className="take-space" name="third-element">third element</Element>
      </Element>
      </div>
    )
  }
}
  
  


export default connect(null)(ScrollerProto)