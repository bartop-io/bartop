import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

import TextInput from '../../TextInput/TextInput';
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
        errors.email = 'Invalid email address 🧐';
      }
      return errors;
    }}
    onSubmit={async ({ email }, { setSubmitting, setFieldError }) => {
      try {
        await sendCode(email);
        setSubmitting(false);
        history.replace({ pathname: '/auth/verify', state: { email } });
      } catch (err) {
        setSubmitting(false);
        setFieldError('email', 'Uh oh! Please try again 🙏');
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
          <Prompt>Enter your email to sign in or sign up</Prompt>
        </PromptContainer>
        <InputContainer>
          <TextInput
            type="email"
            id="email"
            placeholder="bilbo@bartop.io"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={touched.email && errors.email}
          />
        </InputContainer>
        <SubmitContainer>
          <SubmitButton type="submit" disabled={isSubmitting}>
            Submit
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
