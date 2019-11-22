import React from 'react';

import { connect } from "react-redux";

import {Route, Link, withRouter} from 'react-router-dom';

import {getProductList} from '../actions';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
// import {types} from '../actions/types.js';


class ProductList extends React.Component{
  constructor(props){
    super(props);
    this.props.getProductList();
  }
  componentDidMount(){
    console.log('component did mount product list, props: ', this.props);
    this.props.getProductList();
    
  }

  // componentDidUpdate(prevProps, prevState){
  //   console.log('component did update product list, props: ', this.props);
  //   // if(prevProps.bucketListState.currentPage !== this.props.bucketListState.currentPage){
  //     this.props.getProductsList();
  //   // }
    
  // }

  generateProductList(){
    console.log('generateProductList');
    let i = 1;
    if(typeof this.props.products !== 'string'){
      this.props.products.map(element =>{
        console.log('products map iteration: ', i++);
        return (
        <li>{element.name}</li> 
        )
      })
    }else{
      return(
        <h1>uhoh</h1>
      );
    };
  }

  render(){
    
    // console.log('productList state: ', state);
    console.log('products list props: ', this.props)
    return(
      <div>
        <h1 className="mt-8">Products list</h1>
        <ul>{this.generateProductList()}</ul>
        
  
      </div>
    );
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


function mapDispatchToProps(dispatch) {
  return {
    getProductList: () => {
      dispatch({type: 'GET_PRODUCT_LIST'});
    }
  };
}

function mapStateToProps(state){
  console.log('state in productsList component: ', state);
  return{
    products: state.products.products
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
export default withRouter(connect(mapStateToProps, {getProductList})(ProductList));