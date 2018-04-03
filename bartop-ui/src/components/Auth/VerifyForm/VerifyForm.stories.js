import React from 'react';

import { storiesOf } from '@storybook/react';

import VerifyForm from './VerifyForm';
import { noop } from '../../../test-helpers/utils';

const requiredProps = {
  history: {},
  email: 'john@smith.com',
  verifyCode: noop
};

storiesOf('VerifyForm', module).add('with required props', () => (
  <VerifyForm {...requiredProps} />
));
