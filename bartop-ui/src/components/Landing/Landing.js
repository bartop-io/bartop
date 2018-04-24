import React from 'react';
import styled from 'styled-components';

import AuthButton from '../AuthButton/AuthButton';
import DrinksList from '../DrinksList/DrinksList';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Landing = () => (
  <Wrapper>
    <AuthButton />
    <DrinksList />
  </Wrapper>
);

export default Landing;
