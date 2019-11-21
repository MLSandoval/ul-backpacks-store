import React from 'react';

import { connect } from "react-redux";

import {Route, Link} from 'react-router-dom';

// import {getProductsList} from '../actions';


class ProductList extends React.Component{
    componentDidMount(){
      this.props.getProductsList();
    }

    generateProductsList(){
      {if(this.props.products){
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
  return {
    getProductsList: () => {
      dispatch(GET_PRODUCTS_LIST);
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