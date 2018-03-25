import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const Label = styled.label`
  font-size: small;
  color: ${props => (props.error ? 'red' : 'dark-grey')};
`;

const Input = styled.input`
  width: 80%;
  display: block;
  font-size: large;
  padding: 5px;
`;

const InputFeedback = styled.div`
  width: 100%;
  text-align: left;
  color: red;
  font-size: small;
  min-height: 15px;
`;

const TextInput = ({
  type,
  id,
  label,
  error,
  value,
  onChange,
  onBlur,
  ...props
}) => (
  <Wrapper>
    {label && (
      <Label htmlFor={id} error={error}>
        {label}
      </Label>
    )}
    <Input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      {...props}
    />
    <InputFeedback>{error}</InputFeedback>
  </Wrapper>
);

TextInput.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

export default TextInput;
