//ross code
import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import {BrowserRouter as Router} from 'react-router-dom'
import thunk from 'redux-thunk'

import reducers from './reducers'
import App from './components/App'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
    document.getElementById('app')
  )
})

//my code
// import React from "react";
// import { render } from "react-dom";
// import { Provider } from "react-redux";
// import { createStore } from "redux";

// import reducers from "./reducers";
// import App from "./components/App";
// import { loadState, saveState } from './localStorage'

// const persistedState = loadState();
// const store = createStore(
//   reducers,
//   persistedState,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// store.subscribe(() => {
//   saveState(store.getState());
// });

// document.addEventListener("DOMContentLoaded", () => {
//   render(
//     <Provider store={store}>
//       <App />
//     </Provider>,
//     document.getElementById("app")
//   );
// });
