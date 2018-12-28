import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = props => (
  <StyledButton {...props}>
    {props.children}
  </StyledButton>
);

const StyledButton = styled.button`
  border: .1rem solid ${({ background }) => background};
  border-radius: .5rem;
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  transition: .3s;
  padding: 1rem 2rem;
  cursor: pointer;
  outline: none;
  display: inline-block;
  text-align: center;
  font-family: inherit;

  &:not(:last-of-type) {
    margin-left: 2rem;
  }

  &:hover, &:focus {
    background: ${({ color }) => color};
    color: ${({ background }) => background};
  }
`;

Button.propTypes = {
  background: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}

export default Button;
