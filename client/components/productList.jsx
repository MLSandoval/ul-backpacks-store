import React from 'react'
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
    this.levityRef = React.createRef();
  }

  scrollToTop() {
    scroll.scrollTop.duration = 0;
    scroll.scrollToTop();
  }
  scrollToCustom(targetName) {
    scroller.scrollTo(`${targetName}`, {
      duration: 300,
      delay: 0,
      smooth:true,
      // offset:-53
    })
  }

  scrollToWithContainer(targetInApp) {
    let goToContainer = new Promise((resolve, reject) => {
      Events.scrollEvent.register('end', () => {
        resolve();
        Events.scrollEvent.remove('end');
      })
      scroller.scrollTo('card-deck', {
        duration: 300,
        delay: 0,
        smooth: 'easeInOutQuart'
      })
    })

    goToContainer.then(() =>
      scroller.scrollTo(targetInApp, {
        duration: 300,
        delay: 0,
        smooth: 'easeInOutQuart',
        containerId: 'card-deck'
      }))
  }

  componentDidMount() {
    scroll.scrollToTop({
      duration: 0
    })
    if(this.props.currentProduct.hasOwnProperty('product_uuid')){
        scroll.scrollTo(this.props.prevY)
    }
    // console.log('current product uuid flag found, scrolled to header then 3.5rem, this.props.currentProduct.product_uuid: ', this.props.currentProduct.name , this.props.currentProduct.product_uuid)
  }

  componentWillUnmount(){
    this.props.savePrevY(window.scrollY)
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
            <BackToTopButton/>
          </div>
        </div>
       
          
      </Element>
    )
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     onViewChangeClick: view => {
//       dispatch(SET_VIEW(view));
//     }
//   };
// }

// // binds on component re-rendering
// ; <button onClick={() => this.props.toggleTodo(this.props.todoId)} />

// // binds on `props` change
// const mapDispatchToProps = (dispatch, ownProps) => {
//   toggleTodo: () => dispatch(toggleTodo(ownProps.todoId))
// }

//if dispatching an async function, must dispatch the function itself as the type property 
//(return the function not an object) itself so thunk intercepts and runs before passing 
//to the reducer
//
//must dispatch type.CORRESPONDING_TYPE when returning a synchronous action, because this will return
//an object to the reducers, which is what they need to run
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

// export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
export default connect(mapStateToProps, {setCurrentProduct, savePrevY})(ProductList)