import styled from 'styled-components';

import { colors, shadows } from '../styleUtils';

const Button = styled.button`
  background-color: ${colors.lightest};
  border: none;
  height: 30px;
  min-width: 90px;
  border-radius: 4px;
  box-shadow: ${shadows.raised};
  font-family: inherit;
  font-size: 14px;

  &:hover {
    cursor: pointer;
    background-color: ${colors.light};
  }

  &:active {
    background-color: ${colors.medium};
  }
`;

export default Button;
