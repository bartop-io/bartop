import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { actions } from '../../ducks/authentication/authentication';
import { isExpired } from '../../utils';

const Button = styled.button`
  border: none;
`;

export const AuthButton = ({ expiresAt, login, logout }) =>
  !expiresAt || isExpired(JSON.parse(expiresAt)) ? (
    <Button onClick={login}>Login</Button>
  ) : (
    <Button onClick={logout}>Logout</Button>
  );

AuthButton.propTypes = {
  expiresAt: PropTypes.string,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

AuthButton.defaultProps = {
  expiresAt: null
};

const mapStateToProps = state => ({
  expiresAt: state.authentication.expiresAt
});

const mapDispatchToProps = {
  login: actions.loginRequest,
  logout: actions.logout
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
