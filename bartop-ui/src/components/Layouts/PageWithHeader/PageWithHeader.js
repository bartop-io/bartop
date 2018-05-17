import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Hamburger from '../../Hamburger/Hamburger';
import { colors, spacing } from '../../styleUtils';
import AuthButton from '../../AuthButton/AuthButton';

const OuterContainer = styled.div.attrs({
  id: 'outer-container'
})`
  height: 100%;
`;

const HEADER_HEIGHT = '50px';

const Header = styled.nav`
  width: 100%;
  height: ${HEADER_HEIGHT};
  position: fixed;
  display: flex;
  align-items: center;
  background-color: ${colors.light};
`;

const HeaderAuthButton = styled(AuthButton)`
  margin-left: auto;
  margin-right: ${spacing.tightHorizontalMargin};
`;

const PageWrapper = styled.main.attrs({
  id: 'page-wrapper'
})`
  height: 100%;
  background-color: ${colors.light};
  padding-top: ${HEADER_HEIGHT};
`;

const PageWithHeader = ({ children, showAuthButton }) => (
  <OuterContainer>
    <Header>{showAuthButton && <HeaderAuthButton />}</Header>
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
