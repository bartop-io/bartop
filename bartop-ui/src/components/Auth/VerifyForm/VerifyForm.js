import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik } from 'formik';

import TextInput from '../../TextInput/TextInput';
import {
  StyledForm,
  PromptContainer,
  Prompt,
  InputContainer,
  SubmitContainer,
  SubmitButton
} from '../StyledComponents';

const MissingCodePrompt = styled.p`
  font-size: small;
  font-style: italic;

  &:hover {
    cursor: pointer;
  }
`;

const VerifyForm = ({ history, email, verifyCode }) => (
  <Formik
    initialValues={{
      verificationCode: ''
    }}
    validate={({ verificationCode }) => ({})}
    onSubmit={async (
      { verificationCode },
      { setSubmitting, setFieldError }
    ) => {
      try {
        await verifyCode(email, verificationCode);
        setSubmitting(false);
        history.replace({
          pathname: '/auth/callback'
        });
      } catch (err) {
        setSubmitting(false);
        setFieldError(
          'verificationCode',
          `Uh oh! The code you entered doesn't match.`
        );
      }
    }}
    render={({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting,
      isValid
    }) => (
      <StyledForm autocomplete="off">
        <PromptContainer>
          <Prompt>An email with the code has been sent to {email}</Prompt>
          <MissingCodePrompt
            onClick={() =>
              history.replace({ pathname: '/auth/login', state: { email } })
            }
          >
            Didn&#39;t receive the code?
          </MissingCodePrompt>
        </PromptContainer>
        <InputContainer>
          <TextInput
            type="text"
            id="verificationCode"
            placeholder="Your code"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.verificationCode}
            error={touched.verificationCode && errors.verificationCode}
          />
        </InputContainer>
        <SubmitContainer>
          <SubmitButton type="submit" disabled={isSubmitting || !isValid}>
            Submit
          </SubmitButton>
        </SubmitContainer>
      </StyledForm>
    )}
  />
);

VerifyForm.propTypes = {
  history: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  verifyCode: PropTypes.func.isRequired
};

export default VerifyForm;
