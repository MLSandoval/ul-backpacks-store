import React from 'react';

import { connect } from "react-redux";
import { push } from "react-router-redux";

import "./styles/footer_style.css";

export default function Footer (props){
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">Footer</div>
        </div>
      </div>
    );
}