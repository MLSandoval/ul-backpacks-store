import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './productsList';
import Landing from './landing.jsx';
import ProductsList from './productsList.jsx';
import Header from './header.jsx';
import Test from './test';


import { Switch, Route, Link } from "react-router-dom";

class App extends React.Component {

  render() {
    
    // if (this.props.state.view === 'landingView'){
      return (
          <div>
            <Header></Header>
            <Route exact path={"/" || "/welcome"} component={Landing} />
            <Route path="/products-list" component={ProductList} />
            <Route path="/test" component={Test} />
          </div>
          
          
        
        // <Landing/>
      );
    // } else if (this.props.state.view === 'productListView'){
      // return (
         
        //   <Route path={"/" || "/welcome"} component={Landing}/>
        //   <Route path="/products-list" component={ProductList}/>
        
        // <ProductList />
      // );
    // }else{
    //   return(
    //     <div>Uhohhhhh</div>
    //   );
      
    // }
  }
}

// function mapStateToProps(state) {
//   console.log('state in header.jsx component: ', state);
//   return {
//     view: state.app.view,
// }

// export default connect(mapStateToProps, {
//   setView: setView
// })(App);




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
