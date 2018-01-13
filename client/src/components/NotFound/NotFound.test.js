import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import NotFound from './NotFound';

it('matches the snapshot', () => {
  const wrapper = shallow(<NotFound />);
  expect(wrapper).toMatchSnapshot();
});
