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
import ModalShell from './modalShell.jsx'
import Header from './header.jsx'
import Footer from './footer.jsx'
import Test from './test'
import ProductDetails from './productDetails'



class App extends React.Component {
  componentDidMount () {
    this.props.getProductList()
    
  }

  render() {
    const {to, staticContext, ...rest} = this.props
    return (
        <div className="app-main">
          {/* <Header/>
          <Route exact path="/" component={Landing} />
          <Route exact path="/products" component={ProductList}/>
          <Route exact path="/test" component={Test} />
          <Route path="/cart" component={Cart}/>
          <Route exact path="/details/:productId" component={ProductDetails}/> 
          <Footer/> */}
          {/*
          this route below is for quick work on the form portion of the checkout modal, must return this to normal when done 
          */}
          <Route path="/" component={ModalShell}/>
        </div>
    )
  }
}

function mapStateToProps(state){
  // console.log('state in app component: ', state);
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
