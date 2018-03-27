import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { actions } from '../../ducks/authentication/authentication';
import strings from '../../strings';

const Button = styled.button`
  border: none;
`;

export const AuthButton = ({ loggedIn, login, logout }) =>
  !loggedIn ? (
    <Button onClick={login}>{strings.auth.login}</Button>
  ) : (
    <Button onClick={logout}>{strings.auth.logout}</Button>
  );

AuthButton.propTypes = {
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
