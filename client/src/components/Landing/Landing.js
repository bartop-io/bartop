import React from 'react';
import styled from 'styled-components';
import { animations } from '../styleUtils';
import logo from '../../images/logo.svg';

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

const Logo = styled.img`
  animation: ${animations.spin} infinite 20s linear;
  height: 80px;
`;

const Title = styled.h1`
  font-size: 1.5em;
`;

const Intro = styled.p`
  font-size: large;
`;

const Landing = () => (
  <Wrapper>
    <Header>
      <Logo src={logo} alt="logo" />
      <Title>Welcome to React</Title>
    </Header>
    <Intro>
      To get started, edit <code>src/Landing.js</code> and save to reload.
    </Intro>
  </Wrapper>
);

export default Landing;
