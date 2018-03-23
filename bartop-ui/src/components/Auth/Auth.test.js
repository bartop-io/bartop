import React from 'react';
import { shallow, mount } from 'enzyme';
import { StaticRouter, Route } from 'react-router-dom';
import 'jest-styled-components';

import { Auth } from './Auth';
import LoginForm from './LoginForm/LoginForm';
import { VerifyForm } from './VerifyForm/VerifyForm';
import Callback from './Callback/Callback';
import NotFound from '../NotFound/NotFound';
import Failure from './Failure/Failure';

// mock Failure since it's a connected component
jest.mock('./Failure/Failure');

const requiredProps = {
  history: {},
  match: {},
  handleAuthentication: jest.fn()
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

it('if path is /auth/verify, renders VerifyForm', () => {
  const wrapper = mountRouterAtLocation('/auth/verify');
  expect(wrapper.find(VerifyForm).exists()).toBe(true);
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
