import React from 'react';

import {connect} from 'react-redux';

import { Switch, Route, Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global_style.css';
import Landing from './landing.jsx';
import ProductList from './productList.jsx';
import Cart from './cart.jsx';
import Header from './header.jsx';
import Footer from './footer.jsx';
import Test from './test';


class App extends React.Component {
  render() {
    return (
        <div>
          <Header/>
          <Route exact path="/" component={Landing} />
          <Route path="/products-list" component={ProductList} />
          <Route path="/products"/>
          <Route path="/test" component={Test} />
          <Route path="/cart" component={Cart}/>
          <Footer/>
        </div>
    );
  }
}




export default App;

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
