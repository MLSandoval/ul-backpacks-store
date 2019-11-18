import React from 'react';
import Landing from './landing.jsx';
import Header from './header.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'landing',
      params: {}
    };

    this.setView = this.setView.bind(this);
  }

  landing(){
    return(
      <Landing/>
    );
  }
  setView(view, params = {}){
    console.log('setview in app called, view/ params: ', view, params);
    this.setState({view, params});
  }

  render() {
    return(
      <Router>
        <Landing viewProducts={this.setView}/>
      </Router>
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

