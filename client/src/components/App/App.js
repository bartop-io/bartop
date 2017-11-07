import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import rootReducer from '../../ducks';
import Landing from '../Landing/Landing';
import './App.css';

// if in development, enable redux dev tools
const enhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : [];
const store = createStore(rootReducer, enhancers);

const App = () => (
  <Provider store={store}>
    <Router>
      <Route path="/" exact component={Landing} />
    </Router>
  </Provider>
);

export default App;
