import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import Landing from './Landing';

it('matches the snapshot', () => {
  const wrapper = shallow(<Landing />);
  expect(wrapper).toMatchSnapshot();
});
