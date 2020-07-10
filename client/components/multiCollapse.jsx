import React, {useState} from 'react'
import {connect} from 'react-redux'

import './styles/orders_style.css'
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'

function MultiCollapse (props) {
  const {order_date} = props

  const [open, setOpen] = useState(false)
  return(
    <React.Fragment>
      <Button size="sm" className="col-2 order-details-btn" onClick={()=>setOpen(!open)} variant="outline-info">{open ? 'Close' : 'Details'}</Button>
      <div className="horizontal-line pt-1 mt-1 rounded-top"></div>
      <Collapse in={open}>
        {props.children}
      </Collapse>
      <div className="horizontal-line mb-3 rounded-bottom"></div>
    </React.Fragment>
  )
}

function mapStateToProps(state, ownProps){
  return ownProps
}

export default connect(mapStateToProps, null)(MultiCollapse)