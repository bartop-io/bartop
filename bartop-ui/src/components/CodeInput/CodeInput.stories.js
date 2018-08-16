import React from 'react';

import { Formik, Form } from 'formik';
import { storiesOf } from '@storybook/react';

import CodeInput from './CodeInput';

const CodeInputProps = {
  type: 'text',
  id: 'example',
  label: 'Label',
  length: 6
};

const ControlledCodeInput = props => (
  <Formik
    initialValues={{ example: '' }}
    render={({ values, handleChange }) => (
      <Form>
        <CodeInput value={values.example} onChange={handleChange} {...props} />
      </Form>
    )}
    onSubmit={s => s}
  />
);

storiesOf('CodeInput', module)
  .add('default', () => <ControlledCodeInput {...CodeInputProps} />)
  .add('with error', () => (
    <ControlledCodeInput {...CodeInputProps} error="Error message goes here" />
  ));
