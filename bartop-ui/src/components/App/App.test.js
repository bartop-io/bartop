import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

jest.mock('redux-localstorage');
jest.mock('redux');
jest.mock('apollo-boost');
jest.mock('react-modal');

it('renders', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.exists()).toBe(true);
});
