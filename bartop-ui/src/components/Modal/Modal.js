import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import styled from 'styled-components';

import { colors, shadows, screenSizes } from '../styleUtils';

const styles = {
  overlay: {
    backgroundColor: colors.overlay,
    zIndex: 2000,
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const Modal = ({ className, hideModal, children }) => (
  <ReactModal
    className={className}
    style={styles}
    isOpen
    onRequestClose={hideModal}
  >
    {children}
  </ReactModal>
);

Modal.propTypes = {
  className: PropTypes.string,
  hideModal: PropTypes.func.isRequired,
  children: PropTypes.node
};

export default styled(Modal)`
  background-color: ${colors.light};
  box-shadow: ${shadows.overlay};
  outline: none;
  min-width: 300px;
  max-width: 90%;
  min-height: 300px;
  max-height: 90%;

  @media (min-width: ${screenSizes.tablet}) {
    min-width: 70%;
    max-width: 90%;
  }

  @media (min-width: ${screenSizes.laptop}) {
    min-width: 60%;
    max-width: 900px;
    max-height: 80%;
  }
`;
