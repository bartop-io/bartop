import React from 'react';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import 'jest-styled-components';
import Landing from './Landing';

it('matches the snapshot', () => {
  const wrapper = mount(<Landing />, {
    context: {
      auth: {
        isAuthenticated: p => p
      }
    },
    childContextTypes: {
      auth: PropTypes.object
    }
  });
  expect(wrapper).toMatchSnapshot();
});
