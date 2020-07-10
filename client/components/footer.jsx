import React from 'react'

import {Element} from 'react-scroll'

import "./styles/footer_style.css"
import Navbar from 'react-bootstrap/Navbar'

export default function Footer (props){
  return (
    <Element name="footer">
      <Navbar className="justify-content-end" bg="light" variant="light">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="../images/logos_icons/backpack_icon.png"
            width="30"
            height="30"
            className="d-inline-block align-top footer-icon"
          />
          UltraLite<sup>TM</sup>
        </Navbar.Brand>
      </Navbar>
    </Element>
  )
}