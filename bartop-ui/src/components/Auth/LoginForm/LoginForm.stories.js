import React from 'react';

import { storiesOf } from '@storybook/react';

import LoginForm from './LoginForm';
import { noop } from '../../../test-helpers/utils';

const requiredProps = {
  history: {},
  sendCode: noop
};

storiesOf('LoginForm', module)
  .add('with required props', () => <LoginForm {...requiredProps} />)
  .add('with a prefillEmail', () => (
    <LoginForm {...requiredProps} prefillEmail="john@smith.com" />
  ));
