import React from 'react';

import { storiesOf } from '@storybook/react';

import TextInput from './TextInput';

const TextInputProps = {
  type: 'text',
  id: 'id'
};

storiesOf('TextInput', module)
  .add('empty', () => <TextInput {...TextInputProps} />)
  .add('with label', () => <TextInput {...TextInputProps} label="Label here" />)
  .add('with error', () => (
    <TextInput {...TextInputProps} error="Error message here" />
  ))
  .add('with label & error', () => (
    <TextInput
      {...TextInputProps}
      label="Label here"
      error="Error message here"
    />
  ));
