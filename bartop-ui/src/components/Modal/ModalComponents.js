/* a collection of shared, Modal-specific styled components */
import styled from 'styled-components';
import { Form as FormikForm } from 'formik';

import { screenSizes } from '../styleUtils';

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 750px;
  height: 100vh;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  background-color: white;

  @media (min-width: ${screenSizes.mobileLarge}) {
    min-width: ${screenSizes.mobileLarge};
  }

  @media (min-width: ${screenSizes.tablet}) {
    min-width: 650px;
  }

  @media (min-width: ${screenSizes.laptop}) {
    flex-direction: row;
    width: 60vw;
  }
`;

export const ImageContainer = styled.div`
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;

  /* bleed image to edge of modal */
  margin: -10px -10px 0;
  padding: 10px;

  @media (min-width: ${screenSizes.laptop}) {
    height: calc(100% + 20px);
    width: 40%;
    margin-right: 0;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;

  @media (min-width: ${screenSizes.laptop}) {
    height: 50%;
  }
`;

export const Form = styled(FormikForm)`
  height: 60%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  @media (min-width: ${screenSizes.laptop}) {
    height: 100%;
  }
`;
