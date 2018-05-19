import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';

import { colors, spacing } from '../styleUtils';

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '25px',
    height: '20px',
    left: spacing.tightHorizontalMargin,
    top: '15px'
  },
  bmBurgerBars: {
    background: colors.darkest
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
    float: 'left'
  },
  bmCross: {
    background: colors.darkest
  },
  bmMenu: {
    background: colors.light,
    padding: '2em 1.5em 0',
    fontSize: '1.15em'
  },
  bmItemList: {
    color: colors.darkest,
    padding: '0.8em'
  },
  bmOverlay: {
    background: colors.overlay
  }
};

const Hamburger = props => (
  <Menu styles={styles} {...props}>
    <h2>BarTop</h2>
    <NavLink to="/">Home</NavLink>
  </Menu>
);

export default Hamburger;
