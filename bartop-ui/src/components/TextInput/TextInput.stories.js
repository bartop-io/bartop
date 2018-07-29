import React from 'react';

import { Formik, Form } from 'formik';
import { storiesOf } from '@storybook/react';

import TextInput from './TextInput';

const TextInputProps = {
  type: 'text',
  id: 'example',
  label: 'Label'
};

const ControlledTextInput = props => (
  <Formik
    initialValues={{ example: '' }}
    render={({ values, handleChange }) => (
      <Form>
        <TextInput value={values.example} onChange={handleChange} {...props} />
      </Form>
    )}
    onSubmit={s => s}
  />
);

storiesOf('TextInput', module)
  .add('with label', () => <ControlledTextInput {...TextInputProps} />)
  .add('with error', () => (
    <ControlledTextInput {...TextInputProps} error="Error message goes here" />
  ));
