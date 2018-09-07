import React from 'react';

import { storiesOf } from '@storybook/react';

import { LoginModal } from './LoginModal';
import { noop } from '../../test-helpers/utils';

const props = {
  sendCode: noop,
  showModal: noop,
  hideModal: noop,
  ariaHideApp: false
};

storiesOf('LoginModal', module).add('default', () => <LoginModal {...props} />);
