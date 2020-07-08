import React from 'react'
import { connect } from "react-redux"
import {Link as LinkRouter} from 'react-router-dom'

import {Element , animateScroll as scroll} from 'react-scroll'

import {setCurrentProduct, savePrevY, setAppHeight} from '../actions'

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
    scroll.scrollToTop({
      duration: 0
    })
    if(this.props.currentProduct.hasOwnProperty('product_uuid')){
        scroll.scrollTo(this.props.prevY)
    }
    document.addEventListener('scroll', this.scrollFn)
  }

  componentWillUnmount(){
    this.props.savePrevY(window.scrollY)
    document.removeEventListener('scroll', this.scrollFn)
  }
 
  generateProductList () {
    if (typeof this.props.products === 'string') {
      return (
        <h1 className="text-white pt-5">
          {this.props.products}
        </h1>
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
                <Card.Img className="img-fluid img-size-restrict pt-3" variant="top" src={imgURL} />
                <Card.Body className="ml-3">
                  <Card.Title className="card-padding-left">{element.name}
                    <div className="title-brand">by {element.brand}</div>
                  </Card.Title>
                  <Card.Text> 
                    <ListGroup variant="flush">
                      <ListGroup.Item className="list-group-text">{element.material}</ListGroup.Item>
                      <ListGroup.Item className="list-group-text">{parseInt(element.weight_ounces).toFixed(1)} oz</ListGroup.Item>
                      <ListGroup.Item className="list-group-text">${element.price}</ListGroup.Item>
                    </ListGroup>
                  </Card.Text>
                </Card.Body>
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
      <Element  className="product-list-main container-fluid flex-grow-1" name="top-listo">
        <div className="opacity-layer flex-grow-1"></div>
        <div className="row ml-2 mr-2 justify-content-around">
        <h3 className="products-title pt-3" name="top">Products list</h3>
          <CardDeck className="product-deck pt-3" id="card-deck">
            { this.generateProductList() } 
          </CardDeck>
          <div>
            {this.state.visibility ? <BackToTopButton className="bring-to-front"/> : null}
          </div>
        </div>
      </Element>
    )
  }
}

function mapStateToProps(state){
  return {
    products: state.products,
    currentProduct: state.currentProduct,
    prevY: state.prevY
  }
}

export default connect(mapStateToProps, {setCurrentProduct, savePrevY, setAppHeight})(ProductList)