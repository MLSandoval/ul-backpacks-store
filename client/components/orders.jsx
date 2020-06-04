import React,{useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link, useHistory, withRouter} from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Collapse from 'react-bootstrap/Collapse'

import './styles/orders_style.css'
import {getOrders} from '../actions'

function Orders (props) {

  useEffect(()=>{
    props.getOrders(localStorage.getItem('user_uuid'))
  }, [])

  const [open, setOpen] = useState(false)

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
                <div key={order.order_uuid} className="row col-12">
                  <div className="order-date col-2 font-weight-bold">{order.order_date}</div>
                  
                  <div className="order-uuid col-6" onClick={()=>setOpen(!open)}>
                    -Order Details-
                  </div>
                  <div className="collapser p-0 m-0">
                    <Collapse in={open} >
                      <div className="p-0 m-0 col-12 d-flex">
                        <div><span className="col-12 font-weight-bold m-0 p-0">Order ID:</span> {order.order_uuid}</div>
                        <div className="col-4">
                          Payment Information
                          <div>
                            <div><span className="font-weight-bold m-0 p-0">Card Number:</span> XXXX-XXXX-XXXX-4123</div>
                          </div>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                  
                  
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
                        <td> </td>
                        <td>Standard shipping + $0.00</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="font-weight-bold">Order Total: </td>
                        <td className="font-weight-bold">${orderTotal.toFixed(2) || '$0.00'}</td>
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

export default withRouter(connect(mapStateToProps, {getOrders})(Orders))