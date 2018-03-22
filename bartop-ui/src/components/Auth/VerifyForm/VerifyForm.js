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

const VerifyConfirmation = styled.p;

const CodeTextInput = styled.input;

const SubmitButton = styled.button;

export const VerifyForm = ({ emailAddress }) => (
  <Wrapper>
    <VerifyConfirmation>
      An email with the code has been sent to {emailAddress}.
    </VerifyConfirmation>
    <CodeTextInput type="text" placeholder="Your Code" />
    <SubmitButton>SUBMIT</SubmitButton>
  </Wrapper>
);

VerifyForm.propTypes = {
  emailAddress: PropTypes.string.isRequired
};

export default VerifyForm;
