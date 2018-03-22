import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const EmailAddressPrompt = styled.p;

const EmailAddressTextInput = styled.input;

const SubmitButton = styled.button;

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      emailAddress: ''
    };
  }

  render() {
    const { submitLoginForm } = this.props;
    return (
      <Wrapper>
        <EmailAddressPrompt>
          Enter your email to sign in or create an account
        </EmailAddressPrompt>
        <EmailAddressTextInput
          type="text"
          placeholder="bilbo@btbb.io"
          onChange={e => this.setState({ emailAddress: e.target.value })}
        />
        <SubmitButton onClick={() => submitLoginForm(this.state.emailAddress)}>
          SUBMIT
        </SubmitButton>
      </Wrapper>
    );
  }
}

LoginForm.propTypes = {
  submitLoginForm: PropTypes.func.isRequired
};

export default LoginForm;
