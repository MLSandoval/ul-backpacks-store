import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import FadeInSection from './fade_in_section.jsx'
import Button from 'react-bootstrap/Button'

import './styles/back_to_top_style.css'

function BackToTop(props){
  return(
		<div name="backToTop" className="back-to-top-button">
				<Button variant="dark" type="button" className="opacity-hover btn-sm" onClick={()=>{scroll.scrollToTop()}}>
					^
				<div>TOP</div>		
				</Button>
		</div>
  )
}
export default BackToTop