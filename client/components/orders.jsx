import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'

import {getOrders} from '../actions'

import './styles/orders_style.css'
import MultiCollapse from './multiCollapse'
import Table from 'react-bootstrap/Table'
import ListGroup from 'react-bootstrap/ListGroup'

function Orders (props) {
  useEffect(()=>{
    props.getOrders(localStorage.getItem('user_uuid'))
  }, [])

  function generateRows(){
    if(!props.orders[0]){
      return (
        <React.Fragment>
          <h3 className="col-12 text-center text-white">You have no past orders.</h3>
          <h3 className="col-12 text-center text-white">Visit our <Link to="/products">products</Link> to get started shopping.</h3>
        </React.Fragment>
      )
    }else{
      return (
        <React.Fragment>
          {
            props.orders.reverse().map((order)=>{
              let prodDataAddedArr = []
              let open = null
              for(let key in order.items){
                let product = props.products.find(product=>product.product_uuid === key ? true : false)
                prodDataAddedArr.push({
                  ...product,
                  quantity: order.items[key]
                })
              }
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
                <div key={order.order_uuid} className="row col-12 justify-content-between align-items-center pb-1 flex-grow-1">
                  <div className="order-date font-weight-bold">{order.order_date}</div>
                    <MultiCollapse order_date={order.order_date} order={order} prodDataAddedArr={prodDataAddedArr}>
                      <div className="p-0 m-0 col-12 border border-info">
                        <ListGroup variant="flush">
                          <ListGroup.Item><span className="font-weight-bold p-0">Order ID:</span> {order.order_uuid}</ListGroup.Item>
                          <ListGroup.Item><span className="font-weight-bold m-0 p-0">Card Number:</span> {order.card_number}</ListGroup.Item>
                          <ListGroup.Item><span className="font-weight-bold m-0 p-0">Shipped to:</span> {`${order.ship_street_address}, ${order.ship_city}, ${order.ship_state} ${order.ship_zip}`}</ListGroup.Item>
                          <ListGroup.Item>Items</ListGroup.Item>
                        </ListGroup>
                        <Table  size="sm" key={order.order_uuid} className="col-12 text-center orders-table">
                          <thead>
                            <tr>
                              <th scope="col-1" className="d-none d-sm-table-cell"></th>  
                              <th scope="col-1">Product</th>
                              <th scope="col-1">Quantity</th>
                              <th scope="col-1">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              prodDataAddedArr.map(orderProdWithData=>{
                                orderTotal += (parseInt(orderProdWithData.price) * parseInt(orderProdWithData.quantity))
                                return(
                                  <React.Fragment key={order.order_uuid + orderProdWithData.product_uuid}>
                                    <tr>
                                      <td className="d-none d-sm-table-cell"><img className="row-image" src={orderProdWithData.image_urls[0]}/></td>
                                      <td>{orderProdWithData.name}</td>
                                      <td>{orderProdWithData.quantity}</td>
                                      <td>${orderProdWithData.price}</td>
                                    </tr>
                                  </React.Fragment>
                                )
                              })
                            }
                            <tr>
                              <td className="d-none d-sm-table-cell"></td>
                              <td></td>
                              <td className="font-weight-bold text-right">{order.shipping_option} Shipping: </td>
                              <td>+ ${shipCost}</td>
                            </tr>
                            <tr>
                              <td className="d-none d-sm-table-cell"></td>
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
    <div className="container-fluid orders-main flex-grow-1">
      <div className="row ml-2 mr-2 justify-content-around">
        <h3 className="orders-title mb-4 pt-3">Your Orders</h3>
        {generateRows()}
      </div>
    </div>
  )
}

function mapStateToProps (state){
  return {
    orders: state.orders,
    userData: state.userData,
    products: state.products
  }
}

export default withRouter(connect(mapStateToProps, {getOrders})(Orders))