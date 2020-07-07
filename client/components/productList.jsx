import React, {useState} from 'react'
import { connect } from "react-redux"
import {Route, Link as LinkRouter, withRouter} from 'react-router-dom'

import * as Scroll from 'react-scroll'
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import {getProductList, setCurrentProduct, savePrevY, setAppHeight} from '../actions'
import types from '../actions/types'

import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import ListGroup from 'react-bootstrap/ListGroup'

import BackToTopButton from './back_to_top_button.jsx'
import FadeInSection from './fade_in_section.jsx'

import "./styles/products_list_style.css"



class ProductList extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      visibility: false
    }

    this.scrollFn = this.handleVisibilityChange.bind(this)
  }

  handleVisibilityChange(){
    if(window.pageYOffset > 35){
      this.setState({visibility: true})
    }else{
      this.setState({visibility: false})
    }
  }
  
  componentDidMount() {
    // this.props.setAppHeight('calc(100vh - 4.6rem)')
    scroll.scrollToTop({
      duration: 0
    })
    if(this.props.currentProduct.hasOwnProperty('product_uuid')){
        scroll.scrollTo(this.props.prevY)
    }

    document.addEventListener('scroll', this.scrollFn)
  }

  componentWillUnmount(){
    // this.props.setAppHeight('auto')
    this.props.savePrevY(window.scrollY)

    document.removeEventListener('scroll', this.scrollFn)
  }
 
  generateProductList () {
    if (typeof this.props.products === 'string') {
      return (
      <h1>{this.props.products}</h1>
      )
    }else if(typeof this.props.products === 'object'){
      return (
        this.props.products.map(element => {
          let imgURL = element.image_urls[0]
          return (
            <LinkRouter
              className={`col-12 col-sm-6  p-1 remove-a-tag-style d-flex pt-3}`}
              key={element.product_uuid} 
              to={`/details/${element.product_uuid}`}
              data-uuid={element.product_uuid}
              name={element.product_uuid}
              onClick={ e =>{ this.props.setCurrentProduct(element) }}
            >
               <FadeInSection classesPassed="w-100">
              <Card className="rounded-0 align-items-center flex-lg-row w-100">
                {/* <Card.Header className="bg-dark">{element.name}</Card.Header> */}
                <Card.Img className="img-fluid img-size-restrict pt-3" variant="top" src={imgURL} />
                <Card.Body className="ml-3">
                  <Card.Title className="card-padding-left">{element.name}
                    <div className="title-brand">by {element.brand}</div>
                  </Card.Title>
                  {/* <Card.Text className="text-sm-left">
                    {element.short_description}
                  </Card.Text> */}
                  <Card.Text> 
                    <ListGroup variant="flush">
                      {/* <ListGroup.Item className="list-group-text list-group-brand">by {element.brand}</ListGroup.Item> */}
                      <ListGroup.Item className="list-group-text">{element.material}</ListGroup.Item>
                      <ListGroup.Item className="list-group-text">{parseInt(element.weight_ounces).toFixed(1)} oz</ListGroup.Item>
                      <ListGroup.Item className="list-group-text">${element.price}</ListGroup.Item>
                    </ListGroup>
                  </Card.Text>
                </Card.Body>
                {/* <Card.Footer className="w-100">
                  <div className="text-muted text-right">by {element.brand}</div>
                </Card.Footer> */}
              </Card>
              </FadeInSection>
            </LinkRouter>
          )
        })
      )
    }
  }

  render(){
    return (
      <Element  className="product-list-main container-fluid flex-grow-1" name="top-listo" 
      // containerId="top-list"
      >
        <div className="opacity-layer flex-grow-1"></div>
        <div className="row ml-2 mr-2 justify-content-around">
        {/* <div style={{height: '3.5rem'}}></div> */}
        <h3 className="products-title pt-3" name="top">Products list</h3>
          <CardDeck 
            // as={CardDeck} 
            className="product-deck pt-3" 
            id="card-deck"
          >
            { this.generateProductList() } 
          </CardDeck>
          <div className="">
            {this.state.visibility ? <BackToTopButton className="bring-to-front"/> : null}
          </div>
        </div>
       
          
      </Element>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getProductList: () => {
      dispatch(getProductList)
    }
  }
}

function mapStateToProps(state){
  // console.log('PRODUCTLIST state: ', state)
  return {
    products: state.products,
    currentProduct: state.currentProduct,
    prevY: state.prevY
  }
}

export default connect(mapStateToProps, {setCurrentProduct, savePrevY, setAppHeight})(ProductList)