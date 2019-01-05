import React from 'react';
import styled from 'styled-components';
import FormGroup from './FormGroup';

 const Select = props => (
   <FormGroup>
    <StyledSelect {...props}>
      {props.children}
    </StyledSelect>
   </FormGroup>
 );

 const StyledSelect = styled.select`
    width: 100%;
    padding: 0.9rem 0;
    border: none;
    border-radius: .3rem;
    font-size: 1.5rem;
    box-shadow: 0 0 .5rem rgba(0, 0, 0, .3);
    outline: none;
    transition: .3s;
    cursor: pointer;
 `;

 export default Select;
