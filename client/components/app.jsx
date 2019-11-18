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
  }

  landing(){
    return(
      <Landing/>
    );
  }

  render() {
    return(
      <Router>
        <Landing/>
      </Router>
    );
  }

}
