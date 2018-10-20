import styled from 'styled-components';

export const StyledRoom = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-grow: 1;
`;

export const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;

export const StyledChooseARoom = styled.div` 
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  color: #b7b7b7;

  i {
    font-size: 8.8rem;
  }

  span {
    font-size: 3.5rem;
  }
`;