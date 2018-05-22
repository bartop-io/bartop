import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import ReactModal from 'react-modal';

import config from '../../config';
import callApiMiddleware from '../../middleware/call-api';
import rootReducer from '../../ducks';
import { actions as authActions } from '../../ducks/authentication/authentication';
import history from '../../singletons/history';
import Landing from '../Landing/Landing';
import Callback from '../Callback/Callback';
import NotFound from '../NotFound/NotFound';
import { colors } from '../styleUtils';
import ModalRoot from '../ModalRoot/ModalRoot';

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

const client = new ApolloClient({
  uri: `${config.apis.bartop.url}/graphql`,
  request: operation => {
    const token = store.getState().authentication.accessToken;
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : ''
      }
    });
  }
});

// styled components helper for adding styles to global dom elements like body
injectGlobal`
html,
body,
#root {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Raleway', sans-serif;
  color: ${colors.darkest};
  /* don't use default styling on links */
  a {
    color:inherit;
    text-decoration: none;
  }
}
`;

ReactModal.setAppElement('#root');

const App = () => (
  <ReduxProvider store={store}>
    <ApolloProvider client={client}>
      <Router history={history}>
        <React.Fragment>
          <Switch>
            <Redirect exact from="/" to="/landing" />
            <Route path="/landing" component={Landing} />
            <Route
              exact
              path="/callback"
              render={() => {
                store.dispatch(authActions.handleAuthentication());
                return <Callback />;
              }}
            />
            <Route component={NotFound} />
          </Switch>
          <ModalRoot />
        </React.Fragment>
      </Router>
    </ApolloProvider>
  </ReduxProvider>
);

export default App;
