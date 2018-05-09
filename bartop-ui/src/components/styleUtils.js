import { keyframes } from 'styled-components';

export const animations = {
  spin: keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `
};

export const colors = {
  main: 'rosybrown',
  dark: 'black',
  light: 'ghostwhite',
  overlay: 'rgba(0, 0, 0, 0.3)'
};
