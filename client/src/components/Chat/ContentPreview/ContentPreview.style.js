import styled from 'styled-components';

export const StyledContentPreview = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center; 
  align-items: center;
  background: rgba(0, 0, 0, .7);
  color: white;
  position: absolute;
  top: 0;
  right: 0;
  flex-direction: column;
`;

export const StyledImagePreview = styled.img`
  max-height: 70%;
  max-width: 70%;
  border: .5rem solid white;
  border-radius: .3rem;
`;