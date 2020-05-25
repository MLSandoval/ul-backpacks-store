import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {Link, useHistory, withRouter} from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Collapse from 'react-bootstrap/Collapse'

import './styles/orders_style.css'
import {getOrders} from '../actions'

function ThankYou (props) {

  useEffect(()=>{
    props.getOrders(localStorage.getItem('user_uuid'))
  }, [])

  function generateRows(){

    if(!props.orders[0]){
      return (
        <tr><td>You have no past orders.</td></tr>
        )
    }else{
      return (
        props.orders.map((order)=>{
          let prodDataAddedArr = []

          for(let key in order.items){
            let product = props.products.find(product=>product.product_uuid === key ? true : false)
            prodDataAddedArr.push({
              ...product,
              quantity: order.items[key]
            })
            console.log('inside man, inside forin, prodDataAddedArr', prodDataAddedArr)
          }

          return(
            <React.Fragment key={order.order_uuid}>
                <tr>
                <td>{order.order_uuid}</td>
                <td>PPPPrice</td>
                <td>td</td>
              </tr>
              <tr>
                <td></td>
                <td>Total: </td>
                <td>$999</td>
              </tr>
            </React.Fragment>
          )
        })
      )
    }
  }
    
  return(
    <Table>
      <thead>
        <tr>
          <td>Product</td>
          <td>Price</td>
          <td></td>
          <td></td>
        </tr>
      </thead>
      <tbody>

      {generateRows()}

      </tbody>
    </Table>  
  )

}

function mapStateToProps (state){
  console.log('orders comp STATE: ', state)
  return {
    orders: state.orders,
    userData: state.userData,
    products: state.products
  }
}

export default withRouter(connect(mapStateToProps, {getOrders})(ThankYou))