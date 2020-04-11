import React from 'react'
import {connect} from 'react-redux'
import {Link, useHistory, withRouter} from 'react-router-dom'

import Modal from 'react-bootstrap/Modal'

import './styles/thank_you_style.css'

function ThankYou (props) {
  let history = useHistory()
  console.log('thank you component history: ', history)

  function autoRedirect(){
    setTimeout(5000, history.push( '/'))
  }

  console.log('thankyou comp rendered props: ', props)
  // autoRedirect()
  return(
    
      <Modal.Body>
        <div>Your order has been submitted.</div>
        <div>The receipt and order information have been sent to your email.</div>
        <div>The receipt and order information have been sent to your email.</div>
      <Modal.Footer>
        <Link to="/">
          <div>If you are not automatically redirected, please click here to return to our homepage.</div>
        </Link>
      </Modal.Footer>  
        
        {/* {() => {setTimeout(5000, history.push('/'))}} */}
      </Modal.Body>
    
    
  )
}

function mapStateToProps (state){
  return {
    // submittedOrder: state.submittedOrder
    totalOrderCost: state.totalOrderCost,
    checkoutFormData: state.checkoutFormData
  }

}

export default withRouter(connect(mapStateToProps, null)(ThankYou))