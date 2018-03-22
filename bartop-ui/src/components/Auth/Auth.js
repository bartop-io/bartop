import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import LoginForm from './LoginForm/LoginForm';
import VerifyForm from './VerifyForm/VerifyForm';
import { actions } from '../../ducks/authentication/authentication';
import NotFound from '../NotFound/NotFound';

export const Auth = ({ match, submitLoginForm }) => (
  <Switch>
    <Route
      exact
      path={`${match.url}/login`}
      render={() => <LoginForm submitLoginForm={submitLoginForm} />}
    />
    <Route
      exact
      path={`${match.url}/verify`}
      render={({ location }) => (
        // We can pass state into route locations, so we pass the emailAddress
        // to the verify route so we don't need to store it in redux or this parent component
        <VerifyForm emailAddress={location.state.emailAddress} />
      )}
    />
    <Route component={NotFound} />
  </Switch>
);

Auth.propTypes = {
  match: PropTypes.object.isRequired,
  submitLoginForm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loggedIn: state.authentication.status.loggedIn
});

const mapDispatchToProps = {
  submitLoginForm: actions.submitLoginForm
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
