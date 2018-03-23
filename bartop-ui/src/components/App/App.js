import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { injectGlobal } from 'styled-components';

import callApiMiddleware from '../../middleware/call-api';
import rootReducer from '../../ducks';
import auth from '../../singletons/authentication';
import history from '../../singletons/history';
import Landing from '../Landing/Landing';
import Auth from '../Auth/Auth';
import NotFound from '../NotFound/NotFound';

// persist all of our auth & user state to local storage
const localStorageEnhancer = persistState(['authentication', 'user'], {
  key: 'bartop'
});

const enhancer = composeWithDevTools(
  applyMiddleware(thunk, callApiMiddleware),
  localStorageEnhancer
);

const store = createStore(
  rootReducer,
  undefined, // optional preloaded state
  enhancer // compose to combine enhancers for middlewares like thunk and other enhancers like dev tools
);

export default class App extends React.Component {
  render() {
    // styled components helper for adding styles to global dom elements like body
    injectGlobal`
      html,
      body,
      #root {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        font-family: sans-serif;
      }
    `;
    return (
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Redirect exact from="/" to="/landing" />
            <Route path="/landing" component={Landing} />
            <Route
              path="/auth"
              render={({ match, history }) => (
                <Auth match={match} history={history} auth={auth} />
              )}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
