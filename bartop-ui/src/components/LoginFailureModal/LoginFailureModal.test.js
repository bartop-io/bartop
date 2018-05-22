import React from 'react';
import { shallow } from 'enzyme';

import LoginForm from './LoginForm';

const requiredProps = {
  history: {},
  sendCode: jest.fn()
};

it('matches the snapshot', () => {
  const wrapper = shallow(<LoginForm {...requiredProps} />);
  expect(wrapper).toMatchSnapshot();
});
