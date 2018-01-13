import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
  margin-top: 100px;
`;

const NotFound = () => (
  <Wrapper>
    Oops! This page doesn't seem to exist{' '}
    <span role="img" aria-label="frowning face">
      ☹️
    </span>
  </Wrapper>
);
export default NotFound;
