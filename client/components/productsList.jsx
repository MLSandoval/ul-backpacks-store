import React from 'react';

import { connect } from "react-redux";

import {Route, Link} from 'react-router-dom';


export default class ProductList extends React.Component{
    constructor(props){
      super(props);
    }

    render(){
      return(
        <div>
          <h1 className="mt-8">Products list</h1>
          {this.state.products.map(element =>{
            return (
            <h1>{element.name}</h1>
            )
          })}
        </div>
      );
    }
}

function mapStateToProps(state){
  return{
    products: state.products
  };
};