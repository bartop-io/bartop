import React from 'react';
import { shallow } from 'enzyme';

import { LoginFailureModal } from './LoginFailureModal';

it('matches the snapshot', () => {
  const wrapper = shallow(<LoginFailureModal />);
  expect(wrapper).toMatchSnapshot();
});
