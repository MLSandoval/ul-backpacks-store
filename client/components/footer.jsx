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
      <Navbar className="border p-auto footer-pos flex-shrink-1" name="footer"  bg="dark"  expand="md">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
      </Navbar>
      
    )
}