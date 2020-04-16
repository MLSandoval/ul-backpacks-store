import React from 'react'

import { connect } from "react-redux"

import {Route, Link, withRouter} from 'react-router-dom'

import {getProductList, setCurrentProduct} from '../actions'
import types from '../actions/types'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

import "./styles/products_list_style.css"

import scrollData from './app.jsx'

class ProductList extends React.Component {

  // getSnapshotBeforeUpdate(prevProps) {
  //   console.log(' XX get snapshot prevProps: ', prevProps)
  //   const {
  //     history: { action },
  //     location: { pathname }
  //   } = prevProps;
  //   console.log(' ProductList getSnapShot action: ', action)
  //   console.log(' ProductList getSnapShot pathname: ', pathname)

  //   if (action !== "POP") {
  //     scrollData = { ...scrollData, [pathname]: window.pageYOffset };
  //   }

  //   return null;
  // }

  // componentDidUpdate() {
  //   // window.scrollTo(0, 0)
  //   console.log(' XX componentDidUpdate productList this.props: ', this.props)
    
  //   const {
  //     history: { action },
  //     location: { pathname }
  //   } = this.props;

  //   if (action === "POP") {
  //     if (scrollData[pathname]) {
  //       setTimeout(() =>
  //         window.scrollTo({
  //           left: 0,
  //           top: scrollData[pathname],
  //           behavior: "smooth"
  //         })
  //       );
  //     } else {
  //       setTimeout(window.scrollTo({ left: 0, top: 0 }));
  //     }
  //   } else {
  //     setTimeout(window.scrollTo({ left: 0, top: 0 }));
  //   }
  // }

  componentDidMount() {
    window.scrollTo(0, 0)
    console.log('this.props on productList mount: ', this.props)
    console.log(' XX componentDidUpdate productList scrollData: ', scrollData)
    // setTimeout(400, console.log('query selector test on mount: ', document.querySelector(`img-fluid`)))
    // console.log('query selector for move scroll to: ', document.querySelector(`.restore-${this.props.currentProduct.product_uuid}`))
    
    // if(!this.props.currentProduct.product_uuid){
    //   window.scrollTo(0, 0)
    // }else if(true){
    //   console.log('inside if else')
    // }
  }

  // componentDidMount() {
  //   const item = document.querySelector(
  //     ".restore-" + this.props.location.state
  //   );
  //   if (item) {
  //     item.scrollIntoView();
  //   }
  // }

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
            <Link 
              className={`col-4 p-1 remove-a-tag-style d-flex restore-{${this.props.currentProduct.hasOwnPropery ? this.props.currentProduct.product_uuid : ''}}`}
              key={element.product_uuid} 
              to={`/details/${element.product_uuid}`}
              data-uuid={element.product_uuid}
              onClick={ e =>{ this.props.setCurrentProduct(element) }}
            >
              <Card >
                {/* <Card.Header className="bg-dark">{element.name}</Card.Header> */}
                <Card.Img className="img-fluid" variant="top" src={imgURL} />
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
            </Link>
          )
        })
      )
    }
  }

  render(){
    return (
      <div className="product-list-main container mt-3 mb-3 flex-grow-1">
        <h1 className="">Products list</h1>
          <CardDeck className="">
            { this.generateProductList() } 
          </CardDeck>
      </div>
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
  // console.log('PRODUCTLIST state: ', state);
  return {
    products: state.products,
    currentProduct: state.currentProduct
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
export default connect(mapStateToProps, {setCurrentProduct})(ProductList)