import React from 'react';
import styled from 'styled-components';

import PageWithHeader from '../Layouts/PageWithHeader/PageWithHeader';
import DrinksList from '../DrinksList/DrinksList';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Landing = () => (
  <PageWithHeader>
    <Wrapper>
      <DrinksList />
    </Wrapper>
  </PageWithHeader>
);

export default Landing;
