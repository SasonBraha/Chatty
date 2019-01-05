import React from 'react';
import styled from 'styled-components';

const FormGroup = props => (
  <StyledFormGroup>
    {props.children}
  </StyledFormGroup>
);

const StyledFormGroup = styled.div`
  position: relative;
  margin-bottom: 3.3rem;
  flex: 1;
`;

export default FormGroup;
