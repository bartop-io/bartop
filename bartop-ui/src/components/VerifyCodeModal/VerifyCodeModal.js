import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { complement } from 'polished';

import Modal from '../Modal/Modal';
import CodeInput from '../CodeInput/CodeInput';
import {
  ModalContainer,
  ImageContainer,
  Image,
  Form
} from '../Modal/ModalComponents';

import strings from '../../strings';
import { actions as authActions } from '../../ducks/authentication/authentication';
import {
  actions as modalActions,
  MODAL_TYPES
} from '../../ducks/modals/modals';
import history from '../../singletons/history';
import VerifyCodeIcon from '../../images/verify-code-icon.svg';
import { colors } from '../styleUtils';

const VerifyImageContainer = ImageContainer.extend`
  background-color: ${complement(colors.lightBlueAccent)};
`;

const VerifyCodePrompt = styled.p`
  font-size: 20px;
  text-align: center;
`;

const MissingCodePrompt = styled.p`
  font-size: 14px;

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export const VerifyCodeModal = ({ email, verifyCode, showModal, ...rest }) => (
  <Modal {...rest}>
    <Formik
      initialValues={{
        verificationCode: ''
      }}
      onSubmit={async (
        { verificationCode },
        { setSubmitting, setFieldError, setFieldValue }
      ) => {
        console.log('gonna subnmit', verificationCode);
        try {
          setFieldError('verificationCode', null);
          await verifyCode(email, verificationCode);
          setSubmitting(false);
          history.push({
            pathname: '/callback'
          });
        } catch (err) {
          console.error(err);
          const message =
            err.code === 'access_denied'
              ? strings.auth.verifyCodeNoMatch
              : strings.auth.verifyCodeFailureFallback;
          setSubmitting(false);
          setFieldError('verificationCode', message);
          // clear value on error, the previously entered code will be shown as the placeholder
          setFieldValue('verificationCode', '', false);
        }
      }}
      render={({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
        setFieldValue,
        submitForm
      }) => (
        <ModalContainer>
          <VerifyImageContainer>
            <Image src={VerifyCodeIcon} />
          </VerifyImageContainer>
          <Form>
            <VerifyCodePrompt>{strings.auth.verifyPrompt}</VerifyCodePrompt>
            <CodeInput
              id="verificationCode"
              onChange={handleChange}
              onBlur={handleBlur}
              value={`${values.verificationCode}`}
              error={touched.verificationCode && errors.verificationCode}
              disabled={isSubmitting}
              submit={submitForm}
            />
            {/* if they didn't receive the code, allow them to go back a step while maintaining the email we sent the code to */}
            <MissingCodePrompt
              onClick={() =>
                showModal(MODAL_TYPES.LOGIN_MODAL, { prefillEmail: email })
              }
            >
              {strings.auth.missingCodePrompt}
            </MissingCodePrompt>
          </Form>
        </ModalContainer>
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
  verifyCode: authActions.verifyCode
};

export default connect(
  undefined,
  mapDispatchToProps
)(VerifyCodeModal);
