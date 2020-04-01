import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import Modal from 'react-bootstrap/Modal'

import './styles/thank_you_style.css'

function ThankYou (props) {

  console.log('thankyou comp rendered props: ', props)
  return(
    
      <Modal.Body>
        <div>Your order has been submitted.</div>
        <div>The receipt and order information have been sent to your email.</div>
        <Link to="/">
          <div>Click here in this box to return to our homepage.</div>
        </Link>
        
      </Modal.Body>
    
    
  )
}

export default connect(null)(ThankYou)