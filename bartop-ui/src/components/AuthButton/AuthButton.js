import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '../Button/Button';
import {
  actions as modalActions,
  MODAL_TYPES
} from '../../ducks/modals/modals';
import { actions as authActions } from '../../ducks/authentication/authentication';
import strings from '../../strings';

export const AuthButton = ({ className, loggedIn, showModal, logout }) =>
  !loggedIn ? (
    <Button
      className={className}
      onClick={() => showModal(MODAL_TYPES.LOGIN_MODAL)}
    >
      {strings.auth.login}
    </Button>
  ) : (
    <Button className={className} onClick={logout}>
      {strings.auth.logout}
    </Button>
  );

AuthButton.propTypes = {
  className: PropTypes.string,
  loggedIn: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  loggedIn: state.authentication.status.loggedIn
});

const mapDispatchToProps = {
  showModal: modalActions.showModal,
  logout: authActions.logout
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
