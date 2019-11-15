import React from 'react';
import Landing from './landing.jsx';
import Header from './header.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'landing',
      params: {}
    };
  }

  render() {
    if(this.state.view === 'landing'){
      return(
        <Landing/>
      );
    }else{
      return (
        <div className="container">
          <div className="row">
            <Header />
          </div>
        </div>
      );
    };
  }
}
