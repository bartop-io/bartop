import { keyframes } from 'styled-components';

export const animations = {
  spin: keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `
};

export const colors = {
  light: '#DDE2E3',
  medium: '#9AACB8',
  dark: '#3C455C',
  lightAccent: '#B37C57',
  darkAccent: '#60412B',
  overlay: 'rgb(60,69,92, 0.3)' // TODO - use defined variable like colors.dark then adjust opacity
};
