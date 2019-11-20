import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './productsList';
import Landing from './landing.jsx';
// import ProductsList from './productsList.jsx';
// import Header from './header.jsx';

export default class App extends React.Component {

  render() {
    console.log("this: ");
    console.table(this);
    console.log('this.props: ', this.props)
    if (this.props.state.view === 'landingView'){
      return (
        // <Router>
        //   <Route path={"/" || "/welcome"} component={Landing}/>
        //   <Route path="/products-list" component={ProductList}/>
        // </Router>
        <Landing/>
      );
    } else if (this.props.state.view === 'productListView'){
      return (
         // <Router>
        //   <Route path={"/" || "/welcome"} component={Landing}/>
        //   <Route path="/products-list" component={ProductList}/>
        // </Router>
        <ProductList />
      );
    }else{
      return(
        <div>Uhohhhhh</div>
      );
      
    }
    
  }

}

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

