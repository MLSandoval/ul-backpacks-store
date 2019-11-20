import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './landing.jsx';
import ProductsList from './productsList.jsx';
import Header from './header.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'landing',
      params: {}
    };

    this.setView = this.setView.bind(this);
    this.landingComponent = this.landingComponent.bind(this);
    this.productsListComponent = this.productsListComponent.bind(this);
    this.headerComponent = this.headerComponent.bind(this);
  }

  landingComponent(){
    return <Landing viewProducts={this.setView} />;
  }

  productsListComponent(){
    return <ProductsList/>;
  }

  //will remove header after routing is figured out, have as ex for now
  headerComponent(){
    return <Header/>;
  }

  setView(view, params = {}){
    console.log('setview in app called, view/ params: ', view, params);
    this.setState({view, params});
  }

  render() {
    return(
     
      // <Router>
      //   <Route path={"/" || "/welcome"} component={this.landingComponent}/>
      //   <Route path="/products-list" component={this.productsListComponent}/>
      //   <Route path="/test" component={this.headerComponent}/>
      // </Router>

      this.landingComponent()
    );
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

