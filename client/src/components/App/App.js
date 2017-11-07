import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import rootReducer from '../../ducks';
import Landing from '../Landing/Landing';
import './App.css';

const store = createStore(rootReducer);

const App = () => (
  <Provider store={store}>
    <Router>
      <Route path="/" exact component={Landing} />
    </Router>
  </Provider>
);

export default App;
