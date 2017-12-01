import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  border: none;
`;

const AuthButton = (props, context) =>
  !context.auth.isAuthenticated() ? (
    <Button onClick={context.auth.login}>Login</Button>
  ) : (
    <Button onClick={context.auth.logout}>Logout</Button>
  );

AuthButton.contextTypes = {
  auth: PropTypes.object
};

export default AuthButton;
