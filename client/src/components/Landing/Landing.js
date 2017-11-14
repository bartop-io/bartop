import React from 'react';
import styled, { keyframes } from 'styled-components';
import logo from '../../images/logo.svg';

// TODO -> determine better way of styling root element in SC
const Content = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

// TODO -> store animations elsewhere? Or is that against SC paradigm?
const logoSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Logo = styled.img`
  animation: ${logoSpin} infinite 20s linear;
  height: 80px;
`;

const Title = styled.h1`
  font-size: 1.5em;
`;

const Intro = styled.p`
  font-size: large;
`;

const Landing = () => (
  <Content>
    <Header>
      <Logo src={logo} alt="logo" />
      <Title>Welcome to React</Title>
    </Header>
    <Intro>
      To get started, edit <code>src/Landing.js</code> and save to reload.
    </Intro>
  </Content>
);

export default Landing;
