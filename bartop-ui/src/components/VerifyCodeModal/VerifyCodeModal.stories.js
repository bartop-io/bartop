import React from 'react';

import { storiesOf } from '@storybook/react';

import { VerifyCodeModal } from './VerifyCodeModal';
import { noop } from '../../test-helpers/utils';

const props = {
  sendCode: noop,
  showModal: noop,
  email: 'billy@bartop.io'
};

storiesOf('VerifyCodeModal', module).add('default', () => (
  <VerifyCodeModal {...props} />
));
