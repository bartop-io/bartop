import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal/Modal';
import strings from '../../strings';

const LoginFailureModal = ({ error, ...rest }) => (
  <Modal {...rest}>
    <p>{`${strings.auth.failure} ${error ? error.message : ''}`}</p>
  </Modal>
);

LoginFailureModal.propTypes = {
  error: PropTypes.object
};

export default LoginFailureModal;
