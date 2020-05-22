import React, {useState} from 'react'
import { connect } from "react-redux"
import {Route, Link as LinkRouter, withRouter} from 'react-router-dom'

import * as Scroll from 'react-scroll'
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import {getProductList, setCurrentProduct, savePrevY} from '../actions'
import types from '../actions/types'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

import BackToTopButton from './back_to_top_button.jsx'
import FadeInSection from './fade_in_section.jsx'

import "./styles/products_list_style.css"



class ProductList extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      visibility: false
    }
  }

  handleVisibilityChange(){
    console.log('visibility cahnge called, this.state.vis: ', this.state.visibility)
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

    document.addEventListener('scroll', ()=>{
			this.handleVisibilityChange()
		})
    // console.log('current product uuid flag found, scrolled to header then 3.5rem, this.props.currentProduct.product_uuid: ', this.props.currentProduct.name , this.props.currentProduct.product_uuid)
  }

  componentWillUnmount(){
    this.props.savePrevY(window.scrollY)

    document.removeEventListener('scroll', ()=>{
      this.handleVisibilityChange()
    })
  }
 
  generateProductList () {
    if (typeof this.props.products === 'string') {
      return (
      <h1>{this.props.products}</h1>
      )
    }else if(typeof this.props.products === 'object'){
      const attributeSwitch = {
        ref: this.levityRef
      }
      return (
        this.props.products.map(element => {
          let imgURL = element.image_urls[0]
          return (
            <LinkRouter
              className={`col-12 col-sm-6 col-md-4 col-lg-3 p-1 remove-a-tag-style d-flex }`}
              key={element.product_uuid} 
              to={`/details/${element.product_uuid}`}
              data-uuid={element.product_uuid}
              name={element.product_uuid}
              onClick={ e =>{ this.props.setCurrentProduct(element) }}
            >
               <FadeInSection className="d-flex">
              <Card {...attributeSwitch} >
                {/* <Card.Header className="bg-dark">{element.name}</Card.Header> */}
                <Card.Img className="img-fluid img-size-restrict" variant="top" src={imgURL} />
                <Card.Body>
                  <Card.Title>{element.name}</Card.Title>
                  <Card.Text className="text-sm-left">
                    {element.short_description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <div className="text-muted text-right">by {element.brand}</div>
                </Card.Footer>
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
      <Element  className="product-list-main container  mb-3 flex-grow-1" name="top-listo" 
      // containerId="top-list"
      >
        <div className="row">
        {/* <div style={{height: '3.5rem'}}></div> */}
        <h1 className="" name="top">Products list</h1>
          <CardDeck 
            // as={CardDeck} 
            className="" 
            id="card-deck"
          >
            { this.generateProductList() } 
          </CardDeck>
          <div className="to-top-pos">
            {
              this.state.visibility ? <BackToTopButton/> : null
                
            }
            
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
  console.log('PRODUCTLIST state: ', state);
  return {
    products: state.products,
    currentProduct: state.currentProduct,
    prevY: state.prevY
  }
}

export default connect(mapStateToProps, {setCurrentProduct, savePrevY})(ProductList)