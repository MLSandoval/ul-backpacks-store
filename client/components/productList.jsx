import React from 'react';

import { connect } from "react-redux";

import {Route, Link, withRouter} from 'react-router-dom';

import {getProductList} from '../actions';
import types from '../actions/types';

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
  //   console.log('product list component did update, props: ', this.props);
  //   // if(prevProps.bucketListState.currentPage !== this.props.bucketListState.currentPage){
  //     this.props.getProductList();
  //   // }
  // }
  // shouldComponentUpdate(){
  //   console.log('product list should component update, props: ', this.props);
  //   if (typeof this.props.products !== 'string') return true;

  //   return false;
  // }

  generateProductList(){
    console.log('generateProductList CALLED');
    let i = 1;
    if(typeof this.props.products === 'string'){
      return (
        <h1>Loading...</h1>
      );

    }else if(typeof this.props.products === 'object'){
      return(
        this.props.products.map(element => {
          console.log('products map iteration: ', i++);
          console.log('Element id within map function', element.id)
          return (
              <li key={element.id}>{element.name}</li>
          )
        })
        
      )
    };
  }

  render(){
    
    // console.log('productList state: ', state);
    console.log('products list props: ', this.props)
    return(
      <div className="pt-4">
        <h1 className="pt-4">Products list</h1>
        <ul>
          {this.generateProductList()}
        </ul>
        
  
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

//if dispatching an async function, must dispatch the function itself as the type property 
//(return the function not an object) itself so thunk intercepts and runs before passing 
//to the reducer
//
//must dispatch type.CORRESPONDING_TYPE when returning a synchronous action, because this will return
//an object to the reducers, which is what they need to run
function mapDispatchToProps(dispatch) {
  return {
    getProductList: () => {
      dispatch(getProductList);
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