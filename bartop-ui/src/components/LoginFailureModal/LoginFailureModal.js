import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { lighten } from 'polished';

import Modal from '../Modal/Modal';
import {
  ModalContainer,
  ImageContainer,
  Image
} from '../Modal/ModalComponents';
import Button from '../Button/Button';
import strings from '../../strings';
import FailureIcon from '../../images/failure-icon.png';
import { screenSizes, colors } from '../styleUtils';
import { actions, MODAL_TYPES } from '../../ducks/modals/modals';

const FailureImageContainer = ImageContainer.extend`
  background-color: ${lighten(0.05, colors.red)};
`;

const MessageContainer = styled.div`
  height: 60%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  @media (min-width: ${screenSizes.laptop}) {
    height: 100%;
  }
`;

const LoginButton = Button.extend`
  width: 90%;
  color: ${colors.white};
  background-color: ${colors.darkest};

  &:hover {
    background-color: ${lighten(0.3, colors.darkest)};
  }

  &:active {
    background-color: ${lighten(0.15, colors.darkest)};
  }
`;

export const LoginFailureModal = ({ error, showModal, ...rest }) => (
  <Modal {...rest}>
    <ModalContainer>
      <FailureImageContainer>
        <Image src={FailureIcon} />
      </FailureImageContainer>
      <MessageContainer>
        <p>{`${strings.auth.failure} ${error ? error.message : ''}`}</p>
        <LoginButton onClick={() => showModal(MODAL_TYPES.LOGIN_MODAL)}>
          {strings.auth.loginButton}
        </LoginButton>
      </MessageContainer>
    </ModalContainer>
  </Modal>
);

LoginFailureModal.propTypes = {
  error: PropTypes.object,
  showModal: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  showModal: actions.showModal
};

export default connect(
  undefined,
  mapDispatchToProps
)(LoginFailureModal);
