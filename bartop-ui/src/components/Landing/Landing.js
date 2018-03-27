import React from 'react';
import styled from 'styled-components';

import AuthButton from '../AuthButton/AuthButton';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Landing = () => (
  <Wrapper>
    <AuthButton />
  </Wrapper>
);

export default Landing;
