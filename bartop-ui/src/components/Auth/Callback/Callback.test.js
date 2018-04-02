import React from 'react';
import { shallow } from 'enzyme';

import Callback from './Callback';

it('matches the snapshot', () => {
  const wrapper = shallow(<Callback />);
  expect(wrapper).toMatchSnapshot();
});
