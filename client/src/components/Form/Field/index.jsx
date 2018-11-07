import React from 'react';
import PropTypes from 'prop-types';
import { StyledInputRow, StyledInputContainer, StyledInput } from './Field.style';

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