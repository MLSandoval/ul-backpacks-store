import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux"; //provides the app state information from redux to the application
import {ConnectedRouter as Router, routerReducer, routerMiddleware} from 'react-router-redux';

import { Switch, Route, Link } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers } from "redux";

import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';


// import createHistory from 'history/createBrowserHistory';
const history = require("history").createBrowserHistory;
// const history = createHistory();
const middleware = routerMiddleware(history);

import rootReducer from "./reducers";
import App from "./components/app.jsx";


const reducers = combineReducers({register: rootReducer, router: routerReducer});
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  // <Provider store={store}>
    // <Router history={history}>
      <div>
        <App />
      </div>,
    // </Router>
  // </Provider>,
  document.getElementById("root")
);
