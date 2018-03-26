import React from 'react';
import styled from 'styled-components';

import strings from '../../strings';

const Wrapper = styled.div`
  text-align: center;
  margin-top: 100px;
`;

const NotFound = () => <Wrapper>{strings.pageNotFound}</Wrapper>;
export default NotFound;
