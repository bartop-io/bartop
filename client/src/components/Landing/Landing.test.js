import React from 'react';
import { mount } from 'enzyme';
import 'jest-styled-components';
import Landing from './Landing';

it('matches the snapshot', () => {
  const wrapper = mount(<Landing />);
  expect(wrapper).toMatchSnapshot();
});
