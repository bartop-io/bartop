import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik } from 'formik';

import TextInput from '../../TextInput/TextInput';
import strings from '../../../strings';

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
          strings.auth.verifyCodeFailureMessage
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
      <StyledForm autoComplete="off">
        <PromptContainer>
          <Prompt>{`${strings.auth.verifyPrompt} ${email}`}</Prompt>
          {/* if they didn't receive the code, allow them to go back a step while maintaining the email we sent the code to */}
          <MissingCodePrompt
            onClick={() =>
              history.replace({ pathname: '/auth/login', state: { email } })
            }
          >
            {strings.auth.missingCodePrompt}
          </MissingCodePrompt>
        </PromptContainer>
        <InputContainer>
          <TextInput
            type="text"
            id="verificationCode"
            placeholder={strings.auth.codeInputPlaceholder}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.verificationCode}
            error={touched.verificationCode && errors.verificationCode}
          />
        </InputContainer>
        <SubmitContainer>
          <SubmitButton type="submit" disabled={isSubmitting || !isValid}>
            {strings.auth.submitButtonText}
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
