import React from 'react';

import { connect } from "react-redux";

import {Route, Link} from 'react-router-dom';

// import {getProductsList} from '../actions';
// import {types} from '../actions/types.js';


class ProductList extends React.Component{
  componentDidMount(){
    this.props.getProductsList();
  }

  componentDidUpdate(){
    console.log('component did update, props: ', this.props)
    this.props.getProductsList();
  }

  generateProductsList(){
    console.log('this.props.products: ', this.props.products);
    if(!typeof this.props.products === 'string'){
      this.props.products.map(element =>{
        return (
        <h1>{element.name}</h1> 
        )
      })
    }else{
      return(
        <h1>uhoh</h1>
      );
    };
  }

  render(){
    console.log('types: ', types);
    // console.log('productList state: ', state);
    console.log('products list props: ', this.props)
    return(
      <div>
        <h1 className="mt-8">Products list</h1>
        {this.generateProductsList()}
  
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


function mapDispatchToProps(dispatch) {
  console.log('types: ', types);
  return {
    getProductsList: () => {
      dispatch({type: 'GET_PRODUCT_LIST'});
    }
  };
}

function mapStateToProps(state){
  console.log('state in productsLIst component: ', state);
  return{
    products: state.products
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);