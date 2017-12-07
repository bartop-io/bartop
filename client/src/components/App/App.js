import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Router, Route, Switch } from 'react-router-dom';
import { injectGlobal } from 'styled-components';

import rootReducer from '../../ducks';
import history from '../../singletons/history';
import { actions as authActions } from '../../ducks/authentication/authentication';
import Landing from '../Landing/Landing';
import Callback from '../Callback/Callback';
import NotFound from '../NotFound/NotFound';

// if in development, enable redux dev tools
const enhancer =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    : () => {};

const store = createStore(
  rootReducer,
  undefined, // optional preloaded state
  compose(applyMiddleware(thunk), enhancer) // compose to combine enhancers for middlewares like thunk and other enhancers like dev tools
);

export default class App extends React.Component {
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
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route
              path="/callback"
              exact
              render={() => {
                store.dispatch(authActions.handleAuthentication());
                return <Callback />;
              }}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
