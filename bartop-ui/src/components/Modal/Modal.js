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

const Modal = ({ children }) => (
  <ReactModal style={styles} isOpen>
    {children}
  </ReactModal>
);

Modal.propTypes = {
  children: PropTypes.node
};

export default Modal;
