import React from 'react';
import { shallow } from 'enzyme';

import VerifyForm from './VerifyForm';

const requiredProps = {
  history: {},
  email: 'bilbo@bartop.io',
  verifyCode: jest.fn()
};

it('matches the snapshot', () => {
  const wrapper = shallow(<VerifyForm {...requiredProps} />);
  expect(wrapper).toMatchSnapshot();
});
