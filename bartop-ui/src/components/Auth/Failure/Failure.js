import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FailureMessage = styled.p``;

export const Failure = ({ error }) => (
  <Wrapper>
    <FailureMessage>{`Authentication failed. ${error.message}`}</FailureMessage>
  </Wrapper>
);

Failure.propTypes = {
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  error: state.authentication.status.error
});

export default connect(mapStateToProps)(Failure);
