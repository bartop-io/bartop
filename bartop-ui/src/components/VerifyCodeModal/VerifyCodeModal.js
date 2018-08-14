import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { complement } from 'polished';

import Modal from '../Modal/Modal';
import TextInput from '../TextInput/TextInput';
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
  }
`;

const CodeInput = styled(TextInput)`
  width: 90%;
`;

export const VerifyCodeModal = ({ email, verifyCode, showModal, ...rest }) => (
  <Modal {...rest}>
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
          console.error(err);
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
        isSubmitting,
        submitForm
      }) => (
        <ModalContainer>
          <VerifyImageContainer>
            <Image src={VerifyCodeIcon} />
          </VerifyImageContainer>
          <Form autoComplete="off">
            <VerifyCodePrompt>{strings.auth.verifyPrompt}</VerifyCodePrompt>
            <CodeInput
              type="text"
              id="verificationCode"
              label={strings.auth.codeInputPlaceholder}
              onChange={e => {
                handleChange(e);
                if (e.target.value.length === 6) {
                  submitForm();
                }
              }}
              onBlur={handleBlur}
              value={values.verificationCode}
              error={touched.verificationCode && errors.verificationCode}
              disabled={isSubmitting}
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
