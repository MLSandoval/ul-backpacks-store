import React from 'react'

import { connect } from "react-redux"

import {Route, Link, withRouter} from 'react-router-dom'

import {getProductList} from '../actions'
import types from '../actions/types'

import "./styles/products_list_style.css"

// import mariposaImg from '../images/product_images/Mariposa/mariposa_1.webp';

class ProductList extends React.Component {
  constructor (props) {
    super (props)
  }
  componentDidMount () {
    console.log('component did mount product list, props: ', this.props)
    this.props.getProductList()
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

  generateProductList () {
    const { match } = this.props
    console.log('generateProductList CALLED')
   
    let i = 1
    if (typeof this.props.products === 'string') {
      return (
        <h1>Loading...</h1>
      )
    }else if(typeof this.props.products === 'object'){
      console.log('this.props.location: ', this.props.location)
      return (
        this.props.products.map(element => {
          console.log('products map iteration: ', i++)
          console.log('Element id within map function', element.id)
          console.log('iteration images: ', element.images)
          let imgURL = element.images[0]
          console.log('imgURL: ', imgURL)
          return (
            // <React.Fragment>
              <Link className="col-4 p-1 remove-a-tag-style" key={element.id} to={`/details/${element.id}`} render=''
              // component={ ProductDetails }
              >
                <div className="card">
                  <div className="card-header bg-transparent border-success">{element.name}</div>
                  {/* <div style={{'background-image': `url(${imgURL})`}} className="card-img-top img-fluid px-0 preview-image pt-1 align-self-center"/> */}
                  <img src={imgURL} alt="" className="card-img-top img-fluid preview-image align-self-center pt-1" />
                  <div className="card-body">
                    <div className="card-text">{element.short_description}</div>
                    {/* <h6 className="card-subtitle">{ element.brand }</h6> */}
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">by {element.brand}</small>
                  </div>
                </div>
              </Link>
            //   <Route path={`${match.path}/details/:productId`} component={ProductDetails} />
            // </React.Fragment>
            
          )
        })
      )
    }
  }


// how the cards were made in wicked sales, looks better than what i have now
//  export default function ProductListItem(props) {
//   return (
//     <div onClick={() => props.clickCallback('details', props.id)} className="col-md-4 align-items-stretch">
//       <div className="mt-2 mb-3">
//         <div className="card ">
//           <h5 className="card-header card-title">{props.productName}</h5>
//           <img src={props.img} alt="" className="card-img-top product-image" />
//           <div className="card-body card-text-section">
//             <p className="card-text description-text">{props.description}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



  render(){
    // console.log('productList state: ', state);
    console.log('products list props: ', this.props)
    const { match } = this.props
    return (
      <div className="pt-4 product-list-main">
        <h1 className="pt-4">Products list</h1>
        <div className=" container">
          <div className="card-deck">
            { this.generateProductList() }
          </div>
        </div>
        {/* <Route path={`${ match.path }/details/:productId`} component={ ProductDetails } /> */}
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
      dispatch(getProductList);
    }
  }
}

function mapStateToProps(state){
  console.log('state in productsList component: ', state);
  return {
    products: state.products.products
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
export default withRouter(connect(mapStateToProps, {getProductList})(ProductList))