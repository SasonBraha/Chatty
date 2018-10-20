import React from 'react';
import styled, { css } from 'styled-components';

const StyledModal =  styled.div`
  width: 100%;
  max-width: 70rem;
  background: white;
  box-shadow: 0 0 .5rem black;
  opacity: 0;
  visibility: hidden;
  transition: .3s;
  position: fixed;
  z-index: 10;
  
  
  ${({ isOpen }) => isOpen && css`
    opacity: 1;
    visibility: visible;
  `}
`;

export default ({ children, isOpen }) => 
  <StyledModal isOpen={isOpen}>{children}</StyledModal>
  
