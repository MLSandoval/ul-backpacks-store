import React from 'react';
import "./styles/header_style.css";
import Landing from './landing';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Header(props) {
  return (
    <Router>
      <div className="position-fixed landing-header container-fluid">
        <div className="row">
          <div className="col-9">UltraLite</div>
          <Link
            className="col-3 products-button"
            onClick={() => {
              props.viewProducts("product list");
            }}
            to="/productsList"
          >
            Products
          </Link>
        </div>
      </div>

      <Switch>
        <Route path="/home">
            <Landing/>
        </Route>
        <Route path="/productsList">
          <ProductList/>
        </Route>
      </Switch>
    </Router>
  );
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