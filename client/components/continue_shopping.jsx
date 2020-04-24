import React, {createRef} from 'react'
import { connect } from 'react-redux'
import {Link as LinkRouter, Route} from 'react-router-dom'

import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'



import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'


import './styles/continue_shopping_style.css'

function ContinueShopping(props){

  function generateContent(){
    return ( props.cart.map(element => {
      console.log('inside continueshopping comp, generate content map, props.cart=> element: ', element)
      let imgURL = element.image_urls[0]
      return (
        <LinkRouter
          className={`col-6 p-1 remove-a-tag-style d-flex }`}
          key={element.product_uuid} 
          to={`/details/${element.product_uuid}`}
          data-uuid={element.product_uuid}
          name={element.product_uuid}
          // onClick={ e =>{ props.setCurrentProduct(element) }}
        >
          {/* <FadeInSection className="d-flex"> */}
          <Card >
            {/* <Card.Header className="bg-dark">{element.name}</Card.Header> */}
            <Card.Img className="img-fluid img-size-restrict" variant="top" src={imgURL} />
            <Card.Body>
              <Card.Title>{element.name}</Card.Title>
              <Card.Text className="text-sm-left">
                {element.short_description}
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">by {element.brand}</small>
            </Card.Footer>
          </Card>
          {/* </FadeInSection> */}
         </LinkRouter>
        )
      })
    )
  }



  return(
    <React.Fragment>
      <Modal.Body> 
        <div  className="product-list-main container mt-3 mb-3 flex-grow-1">
          <h3 className="" name="top">Your Items</h3>
            <CardDeck 
              // as={CardDeck} 
              className="" 
              id="card-deck"
            >
              {/* <Card>
                <Card.Img className="img-fluid img-size-restrict" variant="top" src={'./images/product_images/Arc_Blast/arcblast_1.png'}></Card.Img>
              </Card> */}
              { generateContent() } 
            </CardDeck>
            {/* <div className="to-top-pos">
              <BackToTopButton/>
            </div> */}
        </div>
      </Modal.Body>
      <Modal.Footer className="d-flex">
        <div className="col-8"></div>
        <div className="button-container col-4 row justify-content-around">
          <LinkRouter to="/cart" className="">
            <Button
              className="btn-sm"
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
          <LinkRouter to={`/details/${props.currentProduct.product_uuid}`}>
            <Button
              className="btn-sm"
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

export default connect(mapStateToProps)(ContinueShopping)




   
    