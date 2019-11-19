import React from 'react';

import { connect } from "react-redux";
import { push } from "react-router-redux";

import "./styles/header_style.css";

export default function Header(props) {
  return (
      <div className="position-fixed landing-header container-fluid">
        <div className="row">
          <div className="col-9">UltraLite</div>
            <div className="col-3 products-button"
            onClick={() => {
              props.viewProducts("product list");
            }}>
            Products
            </div>
        </div>
      </div>
  );
}

