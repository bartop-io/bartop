import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

const LoginForm = ({ history, sendCode, prefillEmail }) => (
  <Formik
    initialValues={{
      email: prefillEmail || ''
    }}
    validate={({ email }) => {
      const errors = {};
      if (!email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = 'Invalid email address';
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
        setFieldError('email', err.message);
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
      <form onSubmit={handleSubmit}>
        <p>Enter your email to sign in or create an account</p>
        <input
          type="email"
          name="email"
          placeholder="bilbo@bartop.io"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
        />
        {touched.email && errors.email && <div>{errors.email}</div>}
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    )}
  />
);

LoginForm.propTypes = {
  history: PropTypes.object.isRequired,
  sendCode: PropTypes.func.isRequired,
  prefillEmail: PropTypes.string
};

export default LoginForm;
