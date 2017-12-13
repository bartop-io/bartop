import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';

import { AuthButton } from './AuthButton';
import { noop } from '../../testUtils';

const requiredProps = {
  loggedIn: false,
  login: noop,
  logout: noop
};

it('matches the snapshot', () => {
  const wrapper = shallow(<AuthButton {...requiredProps} />);
  expect(wrapper).toMatchSnapshot();
});

it('if logged out, shows login text', () => {
  const wrapper = shallow(<AuthButton {...requiredProps} />);
  expect(wrapper.dive().text()).toEqual('Login');
});

it('if logged out, calls login if clicked', () => {
  const login = jest.spyOn(requiredProps, 'login');
  const wrapper = shallow(<AuthButton {...requiredProps} />);
  expect(login).not.toBeCalled();
  wrapper.dive().simulate('click');
  expect(login).toBeCalled();
  login.mockRestore();
});

it('if logged in, shows logout text', () => {
  const wrapper = shallow(<AuthButton {...requiredProps} loggedIn />);
  expect(wrapper.dive().text()).toEqual('Logout');
});

it('if logged in, calls logout if clicked', () => {
  const logout = jest.spyOn(requiredProps, 'logout');
  const wrapper = shallow(<AuthButton {...requiredProps} loggedIn />);
  expect(logout).not.toBeCalled();
  wrapper.dive().simulate('click');
  expect(logout).toBeCalled();
  logout.mockRestore();
});
