import styled from 'styled-components';

export const StyledMessagesList = styled.div` 
  width: 100%;
  background: var(--chat-background-color);
  overflow-y: auto;
  padding: 1rem;
  transition: .3s;
  flex-grow: 1;
`;

export const StyledInfoMessage = styled.div`
  width: 100%;
  padding: 1rem;
  text-align: center;
  margin: 0 auto;
  background: ${({ background }) => background};
  color: ${({ color }) => color ? color : 'white'};
  border-radius: .5rem;
  margin-bottom: 1rem;
`;