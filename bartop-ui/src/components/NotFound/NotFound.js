import React from 'react';
import styled from 'styled-components';

import PageWithHeader from '../Layouts/PageWithHeader/PageWithHeader';
import strings from '../../strings';

const Wrapper = styled.div`
  padding-top: 200px;
  text-align: center;
`;

const NotFound = () => (
  <PageWithHeader>
    <Wrapper>{strings.pageNotFound}</Wrapper>
  </PageWithHeader>
);
export default NotFound;
