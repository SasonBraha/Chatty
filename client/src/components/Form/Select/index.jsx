import React from 'react';
import PropTypes from 'prop-types';
import { StyledRow, StyledSelect } from './Select.style';

const Select = props => (
  <StyledRow>
    <StyledSelect {...props}>
      {props.children}
    </StyledSelect>
  </StyledRow>
);

Select.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Select;
