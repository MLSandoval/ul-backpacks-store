import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; //provides the app state information from redux to the application
import { createStore } from "redux";
import rootReducer from "./reducers";
import App from "./components/app";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
