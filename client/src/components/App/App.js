import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import rootReducer from '../../ducks';
import Landing from '../Landing/Landing';
import './App.css';

// if in development, enable redux dev tools
const enhancer =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined;
// second argument is optional preloaded state so we pass undefined
const store = createStore(rootReducer, undefined, enhancer);

const App = () => {
  console.log('in app');
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Landing} />
      </Router>
    </Provider>
  );
};

export default App;
