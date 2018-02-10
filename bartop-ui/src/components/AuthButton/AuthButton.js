import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { actions } from '../../ducks/authentication/authentication';

const Button = styled.button`
  border: none;
`;

export const AuthButton = ({ loggedIn, login, logout }) =>
  !loggedIn ? (
    <Button onClick={login}>Login</Button>
  ) : (
    <Button onClick={logout}>Logout</Button>
  );

AuthButton.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

AuthButton.defaultProps = {
  expiresAt: null
};

const mapStateToProps = state => ({
  loggedIn: state.authentication.status.loggedIn
});

const mapDispatchToProps = {
  login: actions.loginRequest,
  logout: actions.logout
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
