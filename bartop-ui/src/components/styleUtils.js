import { keyframes } from 'styled-components';

export const animations = {
  spin: keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `
};

export const colors = {
  lightest: '#FFF',
  light: '#F4F4F4',
  medium: '#D8D2D2',
  dark: '#ADADAD',
  darkest: '#262626',
  overlay: 'rgba(0, 0, 0, 0.15)'
};

export const spacing = {
  tightHorizontalMargin: '15px'
};

// 🙌 @ http://carbondesignsystem.com
export const shadows = {
  raised: '0 1px 2px 0 rgba(0,0,0,0.10)',
  overlay: '0 4px 8px 0 rgba(0,0,0,0.10)',
  stickyNav: '0 6px 12px 0 rgba(0,0,0,0.10)',
  temporaryNav: '0 8px 16px 0 rgba(0,0,0,0.10)',
  popout: '	0 12px 24px 0 rgba(0,0,0,0.10)'
};

export const fontSizes = {
  largest: '54px'
};

export const screenSizes = {
  mobileSmall: '320px',
  mobileMedium: '375px',
  mobileLarge: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopLarge: '1440px',
  fourK: '2560px'
};
