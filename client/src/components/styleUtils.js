import { keyframes } from 'styled-components';

export const animations = {
  spin: keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `
};
