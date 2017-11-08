import React from 'react';
import { shallow } from 'enzyme';
import Landing from './Landing';

it('shallow renders without crashing', () => {
  shallow(<Landing />);
});
