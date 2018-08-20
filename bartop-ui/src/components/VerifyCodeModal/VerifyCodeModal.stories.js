import React from 'react';

import { storiesOf } from '@storybook/react';

import { VerifyCodeModal } from './VerifyCodeModal';
import { noop } from '../../test-helpers/utils';

const props = {
  verifyCode: noop,
  showModal: noop,
  email: 'billy@bartop.io',
  hideModal: noop,
  ariaHideApp: false
};

storiesOf('VerifyCodeModal', module).add('default', () => (
  <VerifyCodeModal {...props} />
));
