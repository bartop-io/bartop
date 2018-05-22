import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik } from 'formik';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';
import TextInput from '../TextInput/TextInput';
import strings from '../../strings';
import { actions as authActions } from '../../ducks/authentication/authentication';
import {
  actions as modalActions,
  MODAL_TYPES
} from '../../ducks/modals/modals';
import history from '../../singletons/history';

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

export const VerifyCodeModal = ({ email, verifyCode, showModal }) => (
  <Modal>
    <Formik
      initialValues={{
        verificationCode: ''
      }}
      // empty validator to clear errors set from onSubmit
      validate={({ verificationCode }) => ({})}
      onSubmit={async (
        { verificationCode },
        { setSubmitting, setFieldError }
      ) => {
        try {
          await verifyCode(email, verificationCode);
          setSubmitting(false);
          history.replace({
            pathname: '/callback'
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
              onClick={
                () =>
                  showModal(MODAL_TYPES.LOGIN_MODAL, { prefillEmail: email })
                // history.replace({ pathname: '/auth/login', state: { email } })
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
  </Modal>
);

VerifyCodeModal.propTypes = {
  email: PropTypes.string.isRequired,
  verifyCode: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  showModal: modalActions.showModal,
  verifyCode: authActions.sendCode
};

export default connect(undefined, mapDispatchToProps)(VerifyCodeModal);
