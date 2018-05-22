import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';
import strings from '../../strings';

const LoginFailureModal = ({ error }) => (
  <Modal>
    <p>{`${strings.auth.failure} ${error ? error.message : ''}`}</p>
  </Modal>
);

LoginFailureModal.propTypes = {
  showModal: PropTypes.func.isRequired,
  error: PropTypes.object
};

export default LoginFailureModal;
