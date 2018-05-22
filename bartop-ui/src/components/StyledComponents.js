import { Form } from 'formik';
import styled from 'styled-components';

export const StyledForm = styled(Form)`
  width: 100%;
  max-width: 600px;
  height: 100%;
  max-height: 600px;
  margin: 0 auto;
  padding: 10px;
`;

export const PromptContainer = styled.div`
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Prompt = styled.p`
  font-size: medium;
`;

export const InputContainer = styled.div`
  height: 40%;
  display: flex;
  align-items: center;
`;

export const SubmitContainer = styled.div`
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SubmitButton = styled.button`
  &:hover:enabled {
    cursor: pointer;
  }
`;
