import React from 'react';
import styled from 'styled-components';

export default props => (
  <StyledNavButton {...props}>
    {Array.from({ length: 3 }).map((_, i) => (
      <StyledNavButtonLine key={i} />
    ))}
  </StyledNavButton>
);

const StyledNavButtonLine = styled.div`
  display: block;
  width: 2.5rem;
  height: 0.3rem;
  max-width: 100%;
  background: white;
  margin: 0.25rem 0;
  transition: 0.3s;
  border-radius: 0.3rem;
  transition: .3s;  
`;

const StyledNavButton = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 1rem;
  transition: 0.3s;
  cursor: pointer;

  &:hover ${StyledNavButtonLine}:nth-of-type(1) {
    max-width: 50%;
  }
  
  &:hover ${StyledNavButtonLine}:nth-of-type(2) {
    max-width: 70%;
  }
`;
