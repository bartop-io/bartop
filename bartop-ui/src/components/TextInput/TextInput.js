import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from '../styleUtils';

const InputContainer = styled.div`
  min-width: 300px;
  position: relative;
  height: 76px;
`;

const Label = styled.label`
  position: absolute;
  transition: all 0.25s ease;
  transition-property: font-size top;
  font-size: ${props => (props.float ? '12px' : '20px')};
  top: ${props => (props.float ? '0' : '22px')};
  color: ${props => (props.float ? (props.error ? 'red' : 'black') : 'grey')};
`;

const Input = styled.input`
  width: 100%;
  font-size: 20px;
  padding: 8px 0;
  font-family: inherit;
  background-color: transparent;
  border: none;
  border-bottom: 2px solid;
  border-bottom-color: ${props => (props.error ? 'red' : colors.darkest)};
  outline: 0;
  position: absolute;
  bottom: 20px;
`;

const InputFeedback = styled.div`
  width: 100%;
  text-align: left;
  color: red;
  font-size: 12px;
  padding: 0;
  position: absolute;
  bottom: 0;
`;

const TextInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  onBlur,
  className,
  ...props
}) => (
  <InputContainer className={className}>
    <Label htmlFor={id} error={error} float={value.trim().length > 0}>
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      {...props}
    />
    <InputFeedback>{error}</InputFeedback>
  </InputContainer>
);

TextInput.defaultProps = {
  value: ''
};

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  className: PropTypes.string
};

export default TextInput;
