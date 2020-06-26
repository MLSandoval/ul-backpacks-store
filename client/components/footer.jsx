import React from 'react'

import { connect } from 'react-redux'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


import "./styles/footer_style.css"

export default function Footer (props){
    return (
      <Navbar className="justify-content-end" bg="light" variant="light">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="../images/logos_icons/backpack_icon.png"
            width="30"
            height="30"
            className="d-inline-block align-top footer-icon"
          />{' '}
          UltraLite<sup>TM</sup>
        </Navbar.Brand>
      </Navbar>
    )
}