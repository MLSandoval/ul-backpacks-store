import React from 'react'
import {animateScroll as scroll} from 'react-scroll'

import Button from 'react-bootstrap/Button'

import './styles/back_to_top_style.css'

export default function BackToTop(props){
  return(
		<div name="backToTop" className="back-to-top-button">
				<Button variant="dark" type="button" className="opacity-hover btn-sm" onClick={()=>{scroll.scrollToTop()}}>
					^
				<div>TOP</div>		
				</Button>
		</div>
  )
}