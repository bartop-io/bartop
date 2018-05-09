import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Hamburger from '../../Hamburger/Hamburger';
import { colors } from '../../styleUtils';
import AuthButton from '../../AuthButton/AuthButton';

const OuterContainer = styled.div.attrs({
  id: 'outer-container'
})`
  height: 100%;
  width: 100%;
`;

const PageWrapper = styled.main.attrs({
  id: 'page-wrapper'
})`
  height: 100%;
`;

const Header = styled.nav`
  width: 100%;
  height: 55px;
  position: fixed;
  display: flex;
  justify-content: flex-end;
  background-color: ${colors.main};
`;

const PageWithHeader = ({ children }) => (
  <OuterContainer>
    <Header>
      <AuthButton />
    </Header>
    <Hamburger outerContainerId="outer-container" pageWrapId="page-wrapper" />
    <PageWrapper>{children}</PageWrapper>
  </OuterContainer>
);

PageWithHeader.propTypes = {
  children: PropTypes.node
};

export default PageWithHeader;
