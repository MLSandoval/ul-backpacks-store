import React from 'react';
import Header from './header.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
// import ProductDetails from './productDetails.jsx';
// import ProductList from './productList.jsx';
// import CartSummary from './cartSummary.jsx';
// import CheckoutForm from './checkoutForm.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Header />
        </div>
      </div>
    );
  }
}
