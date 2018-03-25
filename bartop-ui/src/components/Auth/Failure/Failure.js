import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import strings from '../../../strings';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const FailureMessage = styled.p`
  /* stylelint-disable-line block-no-empty */
`;

export const Failure = ({ error }) => (
  <Wrapper>
    <FailureMessage>{`${strings.auth.failure} ${
      error ? error.message : ''
    }`}</FailureMessage>
  </Wrapper>
);

Failure.propTypes = {
  error: PropTypes.object
};

const mapStateToProps = state => ({
  error: state.authentication.status.error
});

export default connect(mapStateToProps)(Failure);
