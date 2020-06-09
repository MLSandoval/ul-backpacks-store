import React,{useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link, useHistory, withRouter} from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Collapse from 'react-bootstrap/Collapse'
import ListGroup from 'react-bootstrap/ListGroup'

import './styles/orders_style.css'
import {getOrders} from '../actions'

import MultiCollapse from './multiCollapse'

function Orders (props) {

  useEffect(()=>{
    props.getOrders(localStorage.getItem('user_uuid'))
  }, [])

  // const [open, setOpen] = useState(false)
  const [collapseState, setCollapseState] = useState(false)

  function generateRows(){
    if(!props.orders[0]){
      return (
        <React.Fragment>
          <h3 className="col-12 text-center">You have no past orders.</h3>
          <h3 className="col-12 text-center">Visit our <Link to="/products">products</Link> to get started shopping.</h3>
        </React.Fragment>
      )
    }else{
      return (
        <React.Fragment>
          {
            props.orders.map((order)=>{
              let prodDataAddedArr = []
              let open = null
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
              let shipCost
              switch(order.shipping_option){
                case 'Standard':
                  shipCost = 0
                  break;
                case '2-day':
                  shipCost = 10
                  break;
                case 'Overnight':
                  shipCost = 20
                  break;
                default: 
                  shipCost = 0
              }
              return(
                <div key={order.order_uuid} className="row col-12 justify-content-between align-items-center pb-1">
                  <div className="order-date font-weight-bold">{order.order_date}</div>
                  {/* <div className="font-weight-bold text-center">${orderTotal.toFixed(2) || '$0.00'}</div> */}
                  
                    {/* <Button size="sm" className="order-details-btn" onClick={()=>setCollapseState(!collapseState)} variant="outline-info">{open ? 'Close' : 'Order Details'}</Button> */}
                   
                    <MultiCollapse order_date={order.order_date} order={order} prodDataAddedArr={prodDataAddedArr}>
                      <div className="p-0 m-0 col-12 border border-info">
                        <ListGroup variant="flush">
                          <ListGroup.Item><span className="font-weight-bold p-0">Order ID:</span> {order.order_uuid}</ListGroup.Item>
                          <ListGroup.Item><span className="font-weight-bold m-0 p-0">Card Number:</span> {order.card_number}</ListGroup.Item>
              <ListGroup.Item><span className="font-weight-bold m-0 p-0">Shipped to:</span> {`${order.ship_street_address}, ${order.ship_city}, ${order.ship_state} ${order.ship_zip}`}</ListGroup.Item>
                          <ListGroup.Item>Items</ListGroup.Item>
                        </ListGroup>
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
                              <td className="no-wrap-white font-weight-bold text-right">{order.shipping_option} Shipping: </td>
                              <td>+ ${shipCost}</td>
                            </tr>
                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td className="no-wrap-white font-weight-bold text-right">Order Total: </td>
                              <td className="font-weight-bold">${(orderTotal + shipCost).toFixed(2) || '$0.00'}</td>
                            </tr>
                          </tbody>
                        </Table> 
                      </div>
                    </MultiCollapse>
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

export default withRouter(connect(mapStateToProps, {getOrders})(Orders))