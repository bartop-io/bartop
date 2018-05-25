import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { colors, shadows } from '../styleUtils';

const styles = {
  overlay: {
    backgroundColor: colors.overlay
  },
  content: {
    backgroundColor: colors.light,
    boxShadow: shadows.overlay
  }
};

const Modal = ({ hideModal, children }) => (
  <ReactModal style={styles} isOpen onRequestClose={hideModal}>
    {children}
  </ReactModal>
);

Modal.propTypes = {
  hideModal: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default Modal;
