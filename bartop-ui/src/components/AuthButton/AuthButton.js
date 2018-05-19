import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../Button/Button';
import { actions } from '../../ducks/authentication/authentication';
import strings from '../../strings';

export const AuthButton = ({ className, loggedIn, login, logout }) =>
  !loggedIn ? (
    <Button className={className} onClick={login}>
      {strings.auth.login}
    </Button>
  ) : (
    <Button className={className} onClick={logout}>
      {strings.auth.logout}
    </Button>
  );

AuthButton.propTypes = {
  className: PropTypes.string,
  loggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loggedIn: state.authentication.status.loggedIn
});

const mapDispatchToProps = {
  login: actions.startLogin,
  logout: actions.logout
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
