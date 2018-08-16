import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { colors } from '../styleUtils';

const InputContainer = styled.div`
  /* add extra width to prevent text shifting from letter spacing on last letter */
  width: 350px;

  /* offset the extra width */
  margin-right: -40px;
  height: 75px;
`;

const Input = styled.input`
  font-family: 'Anonymous Pro', monospace;
  font-size: 45px;
  letter-spacing: 29px;
  padding: 8px 9px 2px;
  background-color: transparent;
  border: none;
  outline: 0;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    appearance: none;
  }
`;

const DigitUnderlineContainer = styled.div`
  display: flex;
`;

const DigitUnderline = styled.div`
  height: 2px;
  width: 40px;
  border: none;
  background-color: ${props => (props.error ? 'red' : colors.darkest)};
  margin-right: 14px;
`;

const InputFeedback = styled.div`
  width: 100%;
  text-align: left;
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;

// the styles are based on 6 digit codes - if this length changes, the letter-spacing & digit underlines need to change as well
const CODE_LENGTH = 6;

export class CodeInput extends React.Component {
  componentDidUpdate(prevProps) {
    const { value, submit } = this.props;
    // if passed a submit function, auto submit when the user enters the full length code
    // TODO - <Formik> doesn't update values until *after* onChange, so calling submitForm() in VerifyCodeModal will miss the 6th digit
    // but, it feels dirty being in here, so worth exploring a cleaner option at some point
    if (prevProps.value !== value && submit && value.length === CODE_LENGTH) {
      submit();
    }
  }
  render() {
    const {
      id,
      error,
      value,
      onChange,
      onBlur,
      className,
      ...props
    } = this.props;
    return (
      <InputContainer className={className}>
        <Input
          id={id}
          type="number"
          value={value}
          onChange={e => {
            onChange(e);
            // when we hit the length, we auto-submit
            // blur focus and set code value to placeholder to show in case it was incorrect
            if (e.target.value.length === CODE_LENGTH) {
              e.target.blur();
              e.target.placeholder = e.target.value;
            }
          }}
          onBlur={onBlur}
          error={error}
          maxLength={CODE_LENGTH}
          autoComplete="off"
          {...props}
        />
        <DigitUnderlineContainer>
          {[...Array(CODE_LENGTH)].map((e, i) => (
            <DigitUnderline key={i} error={error} />
          ))}
        </DigitUnderlineContainer>
        <InputFeedback>{error}</InputFeedback>
      </InputContainer>
    );
  }
}

CodeInput.defaultProps = {
  value: ''
};

CodeInput.propTypes = {
  id: PropTypes.string.isRequired,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  submit: PropTypes.func
};

export default CodeInput;
