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

const ErrorMessage = styled.p`
  /* stylelint-disable-line block-no-empty */
`;

const VerifyConfirmation = styled.p`
  /* stylelint-disable-line block-no-empty */
`;

const CodeTextInput = styled.input`
  /* stylelint-disable-line block-no-empty */
`;

const SubmitButton = styled.button`
  /* stylelint-disable-line block-no-empty */
`;

export const VerifyForm = ({
  email,
  verificationCode,
  setCode,
  verifyCode,
  verifyCodeError
}) => (
  <Wrapper>
    {verifyCodeError ? (
      <ErrorMessage>
        Something went wrong. Please go back to try again.
      </ErrorMessage>
    ) : (
      <div>
        <VerifyConfirmation>
          An email with the code has been sent to {email}.
        </VerifyConfirmation>
        <CodeTextInput
          type="text"
          placeholder="Your Code"
          value={verificationCode}
          onChange={e => setCode(e.target.value)}
        />
        <SubmitButton onClick={verifyCode}>SUBMIT</SubmitButton>
      </div>
    )}
  </Wrapper>
);

VerifyForm.propTypes = {
  email: PropTypes.string.isRequired,
  verificationCode: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  verifyCode: PropTypes.func.isRequired,
  verifyCodeError: PropTypes.object
};

export default VerifyForm;
