import React from "react"
import ReactDOM from "react-dom"

import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk'

import { BrowserRouter as Router } from "react-router-dom"

import rootReducer from "./reducers"
import App from "./components/app.jsx"

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
)
