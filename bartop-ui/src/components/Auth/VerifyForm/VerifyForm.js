import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

const VerifyForm = ({ history, email, verifyCode }) => (
  <Formik
    initialValues={{
      verificationCode: ''
    }}
    validate={({ verificationCode }) => {
      const errors = {};
      if (!verificationCode) {
        errors.verificationCode = 'Required';
      } else if (verificationCode.length !== 6) {
        errors.verificationCode = 'Code must be six digits';
      }
      return errors;
    }}
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
        setFieldError('verificationCode', err.message);
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
        <p>An email with the code has been sent to {email}</p>
        <input
          type="text"
          name="verificationCode"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.verificationCode}
        />
        {touched.verificationCode &&
          errors.verificationCode && <div>{errors.verificationCode}</div>}
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
        <div
          onClick={() =>
            history.replace({ pathname: '/auth/login', state: { email } })
          }
        >
          Didn&#39;t receive the code?
        </div>
      </form>
    )}
  />
);

VerifyForm.propTypes = {
  history: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  verifyCode: PropTypes.func.isRequired
};

export default VerifyForm;
