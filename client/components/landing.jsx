import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Link as LinkRouter } from 'react-router-dom'

import * as Scroll from 'react-scroll'
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import FadeInSection from './fade_in_section.jsx'
import './styles/landing_style.css'

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
          {/* <div className="row body-bg"> */}
          
            <div className="bg bg-1 col-12 push-over">
              <div className="black-line-top"></div>
              <div className="landing-center">
                <FadeInSection className='landing-center'>
                  <div className="lead text  text1 text-1 col-12 radius">
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
                </FadeInSection>
              </div>
              <div className="black-line-bottom"></div>
            </div>
            
            
            
            <div className="bg bg-2 col-12 push-over">
              <div className="black-line-top"></div>
              <div className="landing-center">
                <FadeInSection className='landing-center'>
                  <div className="lead text  text1 text-1 col-12 radius">
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
                </FadeInSection>
              </div>
              <div className="black-line-bottom"></div>
            </div>
            
          <div className="bg bg-3 col-12 push-over">
            <div className="black-line-top"></div>
            <div className="landing-center">
              <FadeInSection className='landing-center'>
                <div className="lead text  text1 text-1 col-12 radius">
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
              </FadeInSection>
            </div>
            <div className="black-line-bottom"></div>
          </div>
        {/* </div> */}
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
