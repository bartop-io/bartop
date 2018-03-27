import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import TextInput from '../../TextInput/TextInput';
import strings from '../../../strings';

import {
  StyledForm,
  Prompt,
  PromptContainer,
  InputContainer,
  SubmitContainer,
  SubmitButton
} from '../StyledComponents';

const LoginForm = ({ history, sendCode, prefillEmail }) => (
  <Formik
    initialValues={{
      email: prefillEmail || ''
    }}
    validate={({ email }) => {
      const errors = {};
      if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = strings.auth.invalidEmailAddress;
      }
      return errors;
    }}
    onSubmit={async ({ email }, { setSubmitting, setFieldError }) => {
      try {
        await sendCode(email);
        setSubmitting(false);
        // advance to the verification step, passing email in the state so we can display where we sent the code
        history.replace({ pathname: '/auth/verify', state: { email } });
      } catch (err) {
        setSubmitting(false);
        setFieldError('email', strings.auth.sendCodeFailureMessage);
      }
    }}
    render={({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting
    }) => (
      <StyledForm>
        <PromptContainer>
          <Prompt>{strings.auth.loginPrompt}</Prompt>
        </PromptContainer>
        <InputContainer>
          <TextInput
            type="email"
            id="email"
            placeholder={strings.auth.emailInputPlaceholder}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && errors.email}
          />
        </InputContainer>
        <SubmitContainer>
          <SubmitButton type="submit" disabled={isSubmitting}>
            {strings.auth.submitButtonText}
          </SubmitButton>
        </SubmitContainer>
      </StyledForm>
    )}
  />
);

LoginForm.propTypes = {
  history: PropTypes.object.isRequired,
  sendCode: PropTypes.func.isRequired,
  prefillEmail: PropTypes.string
};

export default LoginForm;
