import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ErrorMessage = styled.p``;

const EmailAddressPrompt = styled.p``;

const EmailAddressTextInput = styled.input``;

const SubmitButton = styled.button``;

export const LoginForm = ({ email, setEmail, sendCode, sendCodeError }) => (
  <Wrapper>
    {sendCodeError ? (
      <ErrorMessage>
        Something went wrong. Please refresh to try again.
      </ErrorMessage>
    ) : (
      <div>
        <EmailAddressPrompt>
          Enter your email to sign in or create an account
        </EmailAddressPrompt>
        <EmailAddressTextInput
          type="text"
          placeholder="bilbo@btbb.io"
          onChange={e => setEmail(e.target.value)}
        />
        <SubmitButton onClick={sendCode}>SUBMIT</SubmitButton>
      </div>
    )}
  </Wrapper>
);

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  sendCode: PropTypes.func.isRequired,
  sendCodeError: PropTypes.object
};

export default LoginForm;
