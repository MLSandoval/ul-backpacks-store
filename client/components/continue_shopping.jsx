import React, {createRef, useEffect} from 'react'
import { connect } from 'react-redux'
import {Link as LinkRouter, Route} from 'react-router-dom'

import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'



import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'


import './styles/continue_shopping_style.css'
import {computeCartTotal} from '../actions'

function ContinueShopping(props){

  function generateRows(){
    // return ( props.cart.map(element => {
    //   console.log('inside continueshopping comp, generate content map, props.cart=> element: ', element)
    //   let imgURL = element.image_urls[0]
    //   return (
    //     <LinkRouter
    //       className={`col-6 p-1 remove-a-tag-style d-flex }`}
    //       key={element.product_uuid} 
    //       to={`/details/${element.product_uuid}`}
    //       data-uuid={element.product_uuid}
    //       name={element.product_uuid}
    //       // onClick={ e =>{ props.setCurrentProduct(element) }}
    //     >
    //       {/* <FadeInSection className="d-flex"> */}
    //       <Card >
    //         {/* <Card.Header className="bg-dark">{element.name}</Card.Header> */}
    //         <Card.Img className="img-fluid img-size-restrict" variant="top" src={imgURL} />
    //         <Card.Body>
    //           <Card.Title>{element.name}</Card.Title>
    //           <Card.Text className="text-sm-left">
    //             {element.short_description}
    //           </Card.Text>
    //         </Card.Body>
    //         <Card.Footer>
    //           <small className="text-muted">by {element.brand}</small>
    //         </Card.Footer>
    //       </Card>
    //       {/* </FadeInSection> */}
    //      </LinkRouter>
    //     )
    //   })
    // )
    return( 
      props.cart.map((element)=>{
        return(
          <React.Fragment key={element.product_uuid}>
            <tr>
              <td>{element.name + ' '}
                <sm>by {element.brand}</sm>
              </td>
              <td></td>
              <td>${element.price}</td>
            </tr>
            
          </React.Fragment>
          
        )
      })
    )
  }

  useEffect(()=>{
    console.log('continueshopping props: ', props)
    props.computeCartTotal(props.cart)
  })

  function computeItemCount(){
    let total=0
    props.cart.map((element)=>{
      total += element.quantity
    })
    return total
  }

  return(
    <React.Fragment>
      <Modal.Body> 
        <div  className="d-flex container mt-3">
          <div className="col-9"></div>
          <h6 className="col-3 no-wrap-white" name="top" ></h6>
        </div>
        
        <Table size="sm">
          <thead>
            <tr>
              <th>{props.cart.length === 1 ? 'Item' : 'Items' }</th>
              <th></th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {generateRows()}
            <tr>
              <td >Item Count: {computeItemCount()}</td>
              <td className="d-flex justify-content-end no-wrap-white">Cart Total:</td>
              <td>${props.totalOrderCost.toFixed(2)}</td>
            </tr>
            
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer className="d-flex">
        <div className="col-8"></div>
        <div className="button-container col-4 row flex-column justify-content-around">
          <LinkRouter to="/cart">
            <Button
              className="btn-sm col-12 w-100"
              variant="info"
              type="button"
              onClick={() => {
                console.log('go to cart on click')
                }
              }
            >
              Go to Cart
            </Button>
          </LinkRouter>
          <LinkRouter to={`/products`}>
            <Button
              className="btn-sm col-12 w-100"
              variant="dark"
              type="button"
              // onClick={() =>
              //   props.dispatch({ type: "FORM_SUBMIT", payload: { email, password } })
              // }
            >
              Continue Shopping
            </Button>
          </LinkRouter> 
        </div>
      </Modal.Footer>
    </React.Fragment>
  )
}

function mapStateToProps(state){
  return {
    totalOrderCost: state.totalOrderCost,
    currentProduct: state.currentProduct,
    cart: state.cart
  }
}

export default connect(mapStateToProps, {computeCartTotal})(ContinueShopping)

