import React from 'react';
import styled, { css } from "styled-components";
import PropTypes from 'prop-types';
import { err } from '../../resources/themeVariables';

const StyledInputRow = styled.div`
  margin-bottom: 2rem;

  ${({ isInvalid }) => isInvalid && css`
    color: ${err};
    font-size: 1.3rem;
    text-align: right;
  `}
`;

const StyledInputContainer = styled.div`
  position: relative;
  
  .label {
    position: absolute;
    right: .1rem;
    top: 1.3rem;
    cursor: text;
    transition: .3s;
  }

  .icon {
    position: absolute;
    left: .5rem;
    top: 1.5rem;
  }
`;

const StyledInput = styled.input`
  display: block;
  border: none;
  padding: 1rem 0 1rem 3rem;
  width: 100%;
  outline: none;
  border-bottom: .1rem solid lightgray;

  &:focus, &:valid {
    & ~ label {
      transform-origin: top right;
      transition: .3s;
      transform: translateY(-2.3rem) scale(.85);
    }
  }
`;

const Field = props => 
  <StyledInputRow isInvalid={props.error}>
    <StyledInputContainer>
      <StyledInput
        id={props.name}
        name={props.name}
        value={props.value}
        type={props.type}
        onChange={props.onChange} 
        required
      />
      <label htmlFor={props.name} className="label">{props.labelValue}</label>
      <i className={`${props.icon} icon`}></i>
      {props.error && <div>{props.error}</div>}
    </StyledInputContainer>
  </StyledInputRow>;

Field.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  icon: PropTypes.string.isRequired,
  labelValue: PropTypes.string.isRequired
}

Field.defaultProps = {
  type: 'text'
}

export default Field;