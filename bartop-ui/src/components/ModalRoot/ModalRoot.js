import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';
import LoginModal from '../LoginModal/LoginModal';
import VerifyCodeModal from '../VerifyCodeModal/VerifyCodeModal';
import LoginFailureModal from '../LoginFailureModal/LoginFailureModal';
import { actions, MODAL_TYPES } from '../../ducks/modals/modals';

export const MODAL_COMPONENTS = {
  [MODAL_TYPES.DEFAULT_MODAL]: Modal,
  [MODAL_TYPES.LOGIN_MODAL]: LoginModal,
  [MODAL_TYPES.VERIFY_CODE_MODAL]: VerifyCodeModal,
  [MODAL_TYPES.LOGIN_FAILURE_MODAL]: LoginFailureModal
};

export const ModalRoot = ({ modalType, modalProps, hideModal }) => {
  if (!modalType) {
    return null;
  }
  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal hideModal={hideModal} {...modalProps} />;
};

ModalRoot.propTypes = {
  modalType: PropTypes.string,
  modalProps: PropTypes.object,
  hideModal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  modalType: state.modals.modalType,
  modalProps: state.modals.modalProps
});

const mapDispatchToProps = {
  hideModal: actions.hideModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);
