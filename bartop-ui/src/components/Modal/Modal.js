import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import styled from 'styled-components';

import cancelIcon from '../../images/cancel.svg';
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

const CancelButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;

const CancelIcon = styled.img`
  width: 10px;
  height: 10px;
`;

const Modal = ({ className, hideModal, children }) => (
  <ReactModal
    className={className}
    style={styles}
    isOpen
    onRequestClose={hideModal}
  >
    <CancelButton onClick={hideModal}>
      <CancelIcon src={cancelIcon} />
    </CancelButton>
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
  position: relative;
  outline: none;
  min-width: 320px;
  max-width: 100%;
  max-height: 100%;
  padding: 10px;

  @media (min-width: ${screenSizes.mobileMedium}) {
    min-width: 380px;
    max-width: 90%;
  }

  @media (min-width: ${screenSizes.tablet}) {
    max-width: 80%;
  }

  @media (min-width: ${screenSizes.laptop}) {
    max-width: 900px;
  }
`;
