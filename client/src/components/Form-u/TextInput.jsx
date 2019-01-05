import React from 'react'
import styled, { css } from 'styled-components';
import FormGroup from './FormGroup';

const TextInput = ({ input, error, label, icon }) => (
  <FormGroup>
    <StyledInput 
      id={input.name} 
      name={input.name}
      {...input} 
      required
      autoComplete="off"
    />
    <StyledInputError>{error}</StyledInputError>
    <StyledLabel htmlFor={input.name}>{label}</StyledLabel>
    <StyledInputIcon className={icon} />
  </FormGroup>
);

const StyledInput = styled.input`
  border: none;
  background: white;
  border-bottom: .2rem solid #d4d4d4;
  display: block;
  padding: .5rem .2rem;
  outline: none;
  width: 100%;
  transition: .3s;
  font-family: inherit;
  font-size: 1.5rem;


  &:focus, &:valid {
    border-color: var(--main-color);
    
    & ~ label, & ~ i {
      color: var(--main-color);
    }
    
    & ~ label {
      font-size: 1.4rem;
      transform: translateY(-1.7rem);
    }
  }

  ${({ error }) => error && css`
    border-color: var(--danger-color);
  
    & ~ label, & ~ i {
      color: var(--danger-color);
    }
  `}
`;

const StyledLabel = styled.label`
  position: absolute;
  transition: .25s;
  cursor: text;
  user-select: none;
  color: #888;
  right: .1rem;
  top: 0;
  transition: .3s;
`;

const StyledInputIcon = styled.i`
  position: absolute;
  transition: .3s;
  left: 0.4rem;
  top: 0.62rem;
  width: 2rem;
  height: 3rem;
`;

const StyledInputError = styled.div`
  color: var(--danger-color);
  font-size: 1.25rem;
  text-align: left;
`;

export default TextInput;


