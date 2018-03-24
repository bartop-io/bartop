import React from 'react';
import { shallow, mount } from 'enzyme';
import { StaticRouter, Route } from 'react-router-dom';
import 'jest-styled-components';

import { Auth } from './Auth';
import LoginForm from './LoginForm/LoginForm';
import VerifyForm from './VerifyForm/VerifyForm';
import Callback from './Callback/Callback';
import NotFound from '../NotFound/NotFound';
import Failure from './Failure/Failure';

jest.mock('./Failure/Failure');

const requiredProps = {
  match: {},
  handleAuthentication: jest.fn(),
  auth: {
    passwordlessStart: jest.fn(),
    passwordlessLogin: jest.fn()
  }
};

const mountRouterAtLocation = location =>
  mount(
    <StaticRouter context={{}} location={location}>
      <Route
        path="/auth"
        render={({ match }) => <Auth {...requiredProps} match={match} />}
      />
    </StaticRouter>
  );

it('matches the snapshot', () => {
  const wrapper = shallow(
    <StaticRouter context={{}}>
      <Auth {...requiredProps} />
    </StaticRouter>
  );
  expect(wrapper).toMatchSnapshot();
});

it('if path is /auth/login, renders LoginForm', () => {
  const wrapper = mountRouterAtLocation('/auth/login');
  expect(wrapper.find(LoginForm).exists()).toBe(true);
});

// TODO - determine why setting location state is only not working in tests
xit('if path is /auth/login and email is in location state, renders LoginForm with prefillEmail prop', () => {
  const wrapper = mountRouterAtLocation({
    pathname: '/auth/login',
    state: { email: 'bilbo@bartop.io' }
  });
  expect(wrapper.find(LoginForm).exists()).toBe(true);
  expect(wrapper.find(LoginForm).prop('prefillEmail')).toEqual(
    'bilbo@bartop.io'
  );
});

// TODO - determine why setting location state is only not working in tests
xit('if path is /auth/verify and email is in location state, renders VerifyForm', () => {
  const wrapper = mountRouterAtLocation({
    pathname: '/auth/verify',
    state: { email: 'bilbo@bartop.io' }
  });
  expect(wrapper.find(VerifyForm).exists()).toBe(true);
  expect(wrapper.find(VerifyForm).prop('prefillEmail')).toEqual(
    'bilbo@bartop.io'
  );
});

it('if path is /auth/verify and email is not in location state, renders NotFound', () => {
  const wrapper = mountRouterAtLocation('/auth/verify');
  expect(wrapper.find(NotFound).exists()).toBe(true);
});

it('if path is /auth/callback, renders Callback and calls handleAuthentication()', () => {
  const wrapper = mountRouterAtLocation('/auth/callback');
  expect(wrapper.find(Callback).exists()).toBe(true);
  expect(requiredProps.handleAuthentication).toBeCalled();
});

it('if path is /auth/failure, renders Failure', () => {
  const wrapper = mountRouterAtLocation('/auth/failure');
  expect(wrapper.find(Failure).exists()).toBe(true);
});

it('if path is anything else, renders NotFound', () => {
  let wrapper = mountRouterAtLocation('/auth');
  expect(wrapper.find(NotFound).exists()).toBe(true);

  wrapper = mountRouterAtLocation('/auth/no-jawn-here');
  expect(wrapper.find(NotFound).exists()).toBe(true);
});
