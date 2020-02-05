/* eslint-disable */
// some code to ignore the rules
/* eslint-enable */

import React from 'react'

import {connect} from 'react-redux'

import { Switch, Route, Link } from "react-router-dom"


import {getProductList, setCurrentProduct} from '../actions'

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/global_style.css'
import Landing from './landing.jsx'
import ProductList from './productList.jsx'
import Cart from './cart.jsx'
import Checkout from './checkout.jsx'
import Header from './header.jsx'
import Footer from './footer.jsx'
import Test from './test'
import ProductDetails from './productDetails'


class App extends React.Component {
  componentDidMount () {
    this.props.getProductList()
  }

  render() {
    return (
        <div className="app-main">
          <Header/>
          <Route exact path="/" component={Landing} />
          <Route path="/products" component={ProductList}/>
          <Route path="/test" component={Test} />
          <Route path="/cart" component={Cart}/>
          <Route path="/details/:productId" component={ProductDetails}/>
          {/* <Route path="/details" component={ProductDetails}/> */}
          {/* <Route path="/checkout" component={Checkout}/> */}
          <Footer/>
        </div>
    )
  }
}

function mapStateToProps(state){
  console.log('state in productsList component: ', state);
  return {
    products: state.products.products,
    currentProduct: state.currentProduct
  }
}

export default connect(mapStateToProps, {getProductList, setCurrentProduct})(App)


// export default function App() {
//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/users">Users</Link>
//             </li>
//           </ul>
//         </nav>

//         {/* A <Switch> looks through its children <Route>s and
//             renders the first one that matches the current URL. */}
//         <Switch>
//           <Route path="/about">
//             <About />
//           </Route>
//           <Route path="/users">
//             <Users />
//           </Route>
//           <Route path="/">
//             <Home />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   );
// }
