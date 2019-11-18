import React from 'react';
import './styles/landing_style.css';
import Header from './header';
import Footer from './footer'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Landing (props){
  return (
    <Router>
      <Header viewProducts={props.viewProducts} />
      <div className="container-fluid">
        <div className="row">
          <div className="bg bg-1 col-12">BG-1</div>
          <div className=" text text-1 col-12">
            Text-1 Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Morbi quis commodo odio aenean sed adipiscing. Arcu dui vivamus
            arcu felis. Ut placerat orci nulla pellentesque dignissim enim sit
            amet venenatis. Euismod elementum nisi quis eleifend quam
            adipiscing vitae proin sagittis. Maecenas ultricies mi eget mauris
            pharetra et. Gravida rutrum quisque non tellus orci. Suscipit
            adipiscing bibendum est ultricies integer quis auctor elit sed.
            Est sit amet facilisis magna etiam tempor orci eu. Lacus sed
            viverra tellus in hac habitasse platea dictumst vestibulum. Rutrum
            tellus pellentesque eu tincidunt tortor aliquam. Porta nibh
            venenatis cras sed felis eget velit.
          </div>
          <div className="bg bg-2 col-12">BG-2</div>
          <div className="text text-2 col-12">
            Text-2 Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Morbi quis commodo odio aenean sed adipiscing. Arcu dui vivamus
            arcu felis. Ut placerat orci nulla pellentesque dignissim enim sit
            amet venenatis. Euismod elementum nisi quis eleifend quam
            adipiscing vitae proin sagittis. Maecenas ultricies mi eget mauris
            pharetra et. Gravida rutrum quisque non tellus orci. Suscipit
            adipiscing bibendum est ultricies integer quis auctor elit sed.
            Est sit amet facilisis magna etiam tempor orci eu. Lacus sed
            viverra tellus in hac habitasse platea dictumst vestibulum. Rutrum
            tellus pellentesque eu tincidunt tortor aliquam. Porta nibh
            venenatis cras sed felis eget velit. Amet mattis vulputate enim
            nulla aliquet porttitor lacus luctus accumsan. Morbi tincidunt
            augue interdum velit euismod in pellentesque massa placerat.
            Convallis a cras semper auctor neque vitae tempus quam. Dictumst
            quisque sagittis purus sit amet volutpat consequat. Nisi quis
            eleifend quam adipiscing vitae proin sagittis nisl. Habitasse
            platea dictumst vestibulum rhoncus est pellentesque elit
            ullamcorper. Ultrices neque ornare aenean euismod elementum nisi.
          </div>
          <div className="bg bg-3 col-12">BG-3</div>
        </div>
      </div>
      <Footer />
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








{/* <div class="dropdown">
  <button
    class="btn btn-secondary dropdown-toggle"
    type="button"
    id="dropdownMenuButton"
    data-toggle="dropdown"
    aria-haspopup="true"
    aria-expanded="false"
  >
    Dropdown button
  </button>0
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">
      Action
    </a>
    <a class="dropdown-item" href="#">
      Another action
    </a>
    <a class="dropdown-item" href="#">
      Something else here
    </a>
  </div>
</div>; */}