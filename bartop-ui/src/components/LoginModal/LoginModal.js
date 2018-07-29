import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';
import TextInput from '../TextInput/TextInput';
import { actions as authActions } from '../../ducks/authentication/authentication';
import {
  actions as modalActions,
  MODAL_TYPES
} from '../../ducks/modals/modals';
import strings from '../../strings';

import {
  StyledForm,
  Prompt,
  PromptContainer,
  InputContainer,
  SubmitContainer,
  SubmitButton
} from '../StyledComponents';

export const LoginModal = ({ sendCode, showModal, prefillEmail, ...rest }) => (
  <Modal {...rest}>
    <Formik
      initialValues={{
        email: prefillEmail || ''
      }}
      validate={({ email }) => {
        const errors = {};
        if (
          !email ||
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
        ) {
          errors.email = strings.auth.invalidEmailAddress;
        }
        return errors;
      }}
      onSubmit={async ({ email }, { setSubmitting, setFieldError }) => {
        try {
          await sendCode(email);
          setSubmitting(false);
          showModal(MODAL_TYPES.VERIFY_CODE_MODAL, { email });
        } catch (err) {
          console.error(err);
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
              label={strings.auth.emailInputLabel}
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
  </Modal>
);

LoginModal.propTypes = {
  sendCode: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  prefillEmail: PropTypes.string
};

const mapDispatchToProps = {
  showModal: modalActions.showModal,
  sendCode: authActions.sendCode
};

export default connect(
  undefined,
  mapDispatchToProps
)(LoginModal);
