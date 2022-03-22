import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

//REDUX
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./Redux";

//Redux Store
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
