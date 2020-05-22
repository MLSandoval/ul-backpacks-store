import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {Link, useHistory, withRouter} from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import './styles/orders_style.css'
import {getOrders} from '../actions'

function ThankYou (props) {

  useEffect(()=>{
    props.getOrders(props.userData.user_uuid)
  }, [])

  function generateRows(){
    if(!props.orders[0]){
      return (
        <div>You have no past orders.</div>
        )
    }else{
      return (
        props.orders.map((order)=>{
          <Table>
            <thead>
              <tr>col1</tr>
              <tr>col2</tr>
              <tr>col3</tr>
            </thead>
            <tbody>
              <tr>
                <td>{order.order_uuid}</td>
                <td>td</td>
                <td>td</td>
              </tr>
            </tbody>
          </Table>
        })
      )
    }
  }
  
  return(
    generateRows()
  )
}

function mapStateToProps (state){
  console.log('orders comp STATE: ', state)
  return {
    orders: state.orders,
    userData: state.userData
  }
}

export default withRouter(connect(mapStateToProps, {getOrders})(ThankYou))