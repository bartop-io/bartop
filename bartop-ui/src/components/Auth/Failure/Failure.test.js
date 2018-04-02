import React from 'react';
import { shallow } from 'enzyme';

import { Failure, FailureMessage } from './Failure';

it('renders when not passed an error', () => {
  expect(shallow(<Failure />).exists()).toBe(true);
});

it('renders with the error message when present', () => {
  const wrapper = shallow(
    <Failure error={new Error('Some reason for auth failing')} />
  );
  expect(wrapper.exists()).toBe(true);
  expect(wrapper.find(FailureMessage).exists()).toBe(true);
});
