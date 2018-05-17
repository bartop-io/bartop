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
  overlay: 'rgba(0, 0, 0, 0.35)'
};

export const spacing = {
  tightHorizontalMargin: '15px'
};

// 🙌 @ http://carbondesignsystem.com
export const shadows = {
  raised: '0 1px 2px 0 rgba(0,0,0,0.10);'
};

export const fontSizes = {
  largest: '54px'
};
