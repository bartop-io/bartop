import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { darken } from 'polished';

import Modal from '../Modal/Modal';
import TextInput from '../TextInput/TextInput';
import Button from '../Button/Button';
import {
  ModalContainer,
  ImageContainer,
  Image,
  Form
} from '../Modal/ModalComponents';

import { actions as authActions } from '../../ducks/authentication/authentication';

import {
  actions as modalActions,
  MODAL_TYPES
} from '../../ducks/modals/modals';

import LoginIcon from '../../images/login-icon.svg';
import strings from '../../strings';
import { colors } from '../styleUtils';

const LoginImageContainer = ImageContainer.extend`
  background-color: ${colors.lightBlueAccent};
`;

const LoginPrompt = styled.p`
  font-size: 20px;
  text-align: center;
`;

const EmailInput = styled(TextInput)`
  width: 90%;
`;

const LoginButton = Button.extend`
  width: 90%;
  color: ${colors.white};
  background-color: ${colors.lightBlueAccent};

  &:hover {
    background-color: ${darken(0.15, colors.lightBlueAccent)};
  }

  &:active {
    background-color: ${darken(0.3, colors.lightBlueAccent)};
  }

  &:disabled {
    background-color: ${colors.light};
    color: ${colors.medium};
    cursor: not-allowed;
  }
`;

export const LoginModal = ({ sendCode, showModal, prefillEmail, ...rest }) => (
  <Modal {...rest}>
    <Formik
      initialValues={{
        email: prefillEmail || ''
      }}
      isInitialValid={prefillEmail}
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
        isSubmitting,
        isValid
      }) => {
        const email = values.email.trim();
        const emailInputError =
          touched.email && email.length > 0 && errors.email;
        return (
          <ModalContainer>
            <LoginImageContainer>
              <Image src={LoginIcon} />
            </LoginImageContainer>
            <Form>
              <LoginPrompt>{strings.auth.loginPrompt}</LoginPrompt>
              <EmailInput
                type="email"
                id="email"
                label={strings.auth.emailInputLabel}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={emailInputError}
              />
              <LoginButton type="submit" disabled={isSubmitting || !isValid}>
                {strings.auth.loginButton}
              </LoginButton>
            </Form>
          </ModalContainer>
        );
      }}
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
