import React from 'react'

import { connect } from "react-redux"

import {Route, Link, withRouter} from 'react-router-dom'

import {getProductList, setCurrentProduct} from '../actions'
import types from '../actions/types'

import "./styles/products_list_style.css"

class ProductList extends React.Component {

  componentDidMount () {

  }

  generateProductList () {
   
    if (typeof this.props.products === 'string') {
      return (
      <h1>{this.props.products}</h1>
      )
    }else if(typeof this.props.products === 'object'){
      return (
        
        this.props.products.map(element => {
          console.log('mapping this.props.products, element:, ', element)
          let imgURL = element.image_urls[0]
          return (
            <Link className="col-4 p-1 remove-a-tag-style" 
              key={element.product_uuid} 
              to={`/details/${element.product_uuid}`}
              data-uuid={element.product_uuid}
              onClick={ e =>{ this.props.setCurrentProduct(element) }}
            >
              <div className="card">
                <div className="card-header bg-transparent border-success">{element.name}</div>
                <img src={imgURL} alt="" className="card-img-top img-fluid preview-image align-self-center pt-1" />
                <div className="card-body">
                  <div className="card-text text-sm-center">{element.short_description}</div>
                </div>
                <div className="card-footer">
                  <small className="text-muted">by {element.brand}</small>
                </div>
              </div>
            </Link>
          )
        })
      )
    }
  }

  render(){
    return (
      <div className="pt-4 product-list-main">
        <h1 className="pt-4">Products list</h1>
        <div className=" container">
          <div className="card-deck">
            { this.generateProductList() }
          </div>
        </div>
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
  console.log('PRODUCTLIST state: ', state);
  return {
    products: state.products,
    currentProduct: state.currentProduct
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
export default connect(mapStateToProps, {setCurrentProduct})(ProductList)