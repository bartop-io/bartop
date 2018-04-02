import React from 'react';

import { storiesOf } from '@storybook/react';

import { Failure } from './Failure';

storiesOf('Failure', module)
  .add('default', () => <Failure />)
  .add('with an error message', () => (
    <Failure error={new Error('Something went horribly wrong!')} />
  ));
