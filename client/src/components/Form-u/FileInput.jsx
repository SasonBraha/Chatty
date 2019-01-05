import React from 'react'
import styled from 'styled-components';
import FormGroup from './FormGroup';

const FileInput = ({ input: { value: omitValue, ...input }, ...props }) => (
  <FormGroup>
    <StyledLabel>
      <StyledFileInput 
        type="file" 
        {...input} 
        accept={props.accept}
        onChange={e => input.onChange(e.target.files[0])}
      />
      {props.label}
    </StyledLabel>
  </FormGroup>
);


const StyledLabel = styled.label`
  width: 100%;
  padding: .7rem .2rem;
  outline: none;
  cursor: pointer;
  font-size: 1.5rem;
  transition: .3s;
  background: white;
  border: .1rem dashed var(--main-color);
  color: var(--main-color);
  display: block;
  text-align: center;
  border-radius: .3rem;

  &:hover {
    color: white;
    background: var(--main-color);
    border-color: white;
  }
`;

const StyledFileInput = styled.input`
  display: none;
`;

export default FileInput;
