import React from 'react';
import styled from 'styled-components';

import PageWithHeader from '../Layouts/PageWithHeader/PageWithHeader';

import { fontSizes, spacing } from '../styleUtils';

const Wrapper = styled.div`
  max-width: 600px;
  height: 60%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${spacing.tightHorizontalMargin};
`;

const Greeting = styled.h1`
  font-size: ${fontSizes.largest};
`;

const Landing = () => (
  <PageWithHeader>
    <Wrapper>
      <Greeting>
        Welcome to BarTop{' '}
        <span role="img" aria-label="champagne-clink">
          🥂
        </span>
      </Greeting>
    </Wrapper>
  </PageWithHeader>
);

export default Landing;
