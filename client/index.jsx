import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux"; //provides the app state information from redux to the application
// import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import { createStore, applyMiddleware } from "redux";

import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

// import createHistory from 'history/createBrowserHistory';
// const history = require("history").createBrowserHistory;
// const history = createHistory();
// const middleware = routerMiddleware(history);

import rootReducer from "./reducers";
import App from "./components/app.jsx";

// const reducers = combineReducers({register: rootReducer, router: routerReducer});
// const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
const store = createStore(rootReducer, applyMiddleware(thunk));
console.log('store before index.jsx rendered: ', store);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
console.log('store after index.jsx rendered: ', store);