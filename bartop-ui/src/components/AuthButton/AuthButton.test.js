import React from 'react';
import { shallow } from 'enzyme';

import { AuthButton } from './AuthButton';
import { noop } from '../../test-helpers/utils';
import { MODAL_TYPES } from '../../ducks/modals/modals';

const requiredProps = {
  loggedIn: false,
  showModal: noop,
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

it('if logged out, shows LoginModal when clicked', () => {
  const showModal = jest.spyOn(requiredProps, 'showModal');
  const wrapper = shallow(<AuthButton {...requiredProps} />);
  expect(showModal).not.toBeCalled();
  wrapper.dive().simulate('click');
  expect(showModal).toBeCalledWith(MODAL_TYPES.LOGIN_MODAL);
  showModal.mockRestore();
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
