import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../Modal/Modal';
import { actions } from '../../ducks/modals/modals';

export const MODAL_TYPES = {
  DEFAULT_MODAL: 'DEFAULT_MODAL'
};

export const MODAL_COMPONENTS = {
  DEFAULT_MODAL: Modal
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
