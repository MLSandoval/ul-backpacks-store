import React from 'react'
import {connect} from 'react-redux'
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import Button from 'react-bootstrap/Button'

import 'back_to_top_style.css'



function BackToTop(){

  return(
    <Element name="backToTop">
      <Button>
        ^
      </Button>
    </Element>
  )
}







export default connect()(BackToTop)