import React from 'react';
import { storiesOf } from '@storybook/react';

import { LoginFailureModal } from './LoginFailureModal';
import { noop } from '../../test-helpers/utils';

const props = {
  showModal: noop,
  hideModal: noop,
  ariaHideApp: false
}

storiesOf('LoginFailureModal', module).add('default', () => (
  <LoginFailureModal {...props} />
));
