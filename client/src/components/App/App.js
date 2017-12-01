import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route } from 'react-router-dom';
import { injectGlobal } from 'styled-components';

import rootReducer from '../../ducks';
import history from '../../history';
import Auth from '../../authentication/authentication';
import Landing from '../Landing/Landing';

// if in development, enable redux dev tools
const enhancer =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined;
// second argument is optional preloaded state so we pass undefined
const store = createStore(rootReducer, undefined, enhancer);

const auth = new Auth();

export default class App extends React.Component {
  // throw auth in context so any child components can use it if needed
  getChildContext() {
    return { auth };
  }
  render() {
    // styled components helper for adding styles to global dom elements like body
    injectGlobal`
      body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
      }
    `;
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" exact component={Landing} />
        </Router>
      </Provider>
    );
  }
}

App.childContextTypes = {
  auth: PropTypes.object
};
