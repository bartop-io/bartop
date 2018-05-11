import React from 'react';
import { push as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';

import { colors } from '../styleUtils';

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '30px',
    height: '25px',
    left: '30px',
    top: '15px'
  },
  bmBurgerBars: {
    background: colors.dark
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: colors.light
  },
  bmMenu: {
    background: colors.dark,
    padding: '2em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: colors.light,
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
