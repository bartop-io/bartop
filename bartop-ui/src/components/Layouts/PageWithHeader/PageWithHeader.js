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
  background-color: ${colors.light};
`;

const Header = styled.nav`
  width: 100%;
  height: 55px;
  position: fixed;
  display: flex;
  justify-content: flex-end;
  background-color: ${colors.light};
`;

const PageWithHeader = ({ children, showAuthButton }) => (
  <OuterContainer>
    <Header>{showAuthButton && <AuthButton />}</Header>
    <Hamburger outerContainerId="outer-container" pageWrapId="page-wrapper" />
    <PageWrapper>{children}</PageWrapper>
  </OuterContainer>
);

PageWithHeader.defaultProps = {
  showAuthButton: true
};

PageWithHeader.propTypes = {
  children: PropTypes.node,
  showAuthButton: PropTypes.bool
};

export default PageWithHeader;
