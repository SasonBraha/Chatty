import styled from 'styled-components';

export const StyledContentPreview = styled.div`
  height: calc(100% - 8rem);
  width: 100%;
  display: flex;
  justify-content: center; 
  align-items: center;
  background: white;
  position: absolute;
  right: 0;
  top: 0;
  flex-direction: column;
  transition: .5s cubic-bezier(0.6, 0.07, 0.07, 1.08);
  z-index: 2;
  transform: translateY(-100%);

  &.entered {
    transform: translateY(0);
  }
`;

export const StyledImagePreview = styled.img`
  max-height: 70%;
  max-width: 70%;
  border: .3rem solid lightgray;
  border-radius: .3rem;
`;

export const StyledFileName = styled.div`
  color: #444;
`;

export const StyledCloseIcon = styled.i`
  position: absolute;
  right: 1.5rem;
  top: 1rem;
  cursor: pointer;
  transition: .2s;
  color: #2F353C;

  &:hover {
    color: #5a5757;
  }
`;