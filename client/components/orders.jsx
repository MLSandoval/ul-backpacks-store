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
        <React.Fragment>
          {
            props.orders.map((order)=>{
              let prodDataAddedArr = []
              for(let key in order.items){
                let product = props.products.find(product=>product.product_uuid === key ? true : false)
                prodDataAddedArr.push({
                  ...product,
                  quantity: order.items[key]
                })
              }
              console.log('orders map, order: ', order)
              console.log('orders map, prodDataAddedArr: ', prodDataAddedArr)
              let orderTotal = 0
              return(
                <div className="row col-12">
                  <div className="order-date col-2 font-weight-bold">{order.order_date}</div>
                  <div className="order-uuid col-6"><span className="font-weight-bold">Order ID:</span> {order.order_uuid}</div>
                  <Table  size="sm" key={order.order_uuid} className="col-12 text-center mb-1">
                    <thead>
                      <tr>
                        <th></th>  
                        <th></th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        prodDataAddedArr.map(orderProdWithData=>{
                          console.log('orderpords compute total, price, quanitty: ', orderProdWithData.price, orderProdWithData.quantity)
                          orderTotal += (parseInt(orderProdWithData.price) * parseInt(orderProdWithData.quantity))
                          return(
                            <React.Fragment key={order.order_uuid + orderProdWithData.product_uuid}>
                              <tr>
                                <td><img className="row-image" src={orderProdWithData.image_urls[0]}/></td>
                                <td></td>
                                <td>{orderProdWithData.name}</td>
                                <td>{orderProdWithData.quantity}</td>
                                <td>${orderProdWithData.price}</td>
                              </tr>
                              
                            </React.Fragment>
                            
                          )
                        })
                      }
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Order Total: </td>
                        <td>${orderTotal.toFixed(2) || '$0.00'}</td>
                      </tr>
                    </tbody>
                  </Table> 
                  <div className="horizontal-line mb-3"></div>
                </div>
              )
            })
          }
        </React.Fragment>
      )
    }
  }
    
  return(
    <div className="container">
      <div className="row">
        <h1 className="title mb-4">Your Orders</h1>
        {generateRows()}
      </div>
      
    </div>

     

      
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