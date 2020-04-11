import React from "react"
import ReactDOM from "react-dom"

import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunk from 'redux-thunk'

import { BrowserRouter as Router } from "react-router-dom"

import rootReducer from "./reducers"
import App from "./components/app.jsx"

const store = createStore(rootReducer, applyMiddleware(thunk));

//trying to fix scroll not reseting when re-rendering
// import createHistory from "history/createBrowserHistory"

// export const history = createHistory()

// history.listen((location, action) => {
//     window.scrollTo(0, 0)
// })
//end section to fix scroll position reset on

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
)
