import styled from 'styled-components';

export const StyledAddMessageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0; 
  background: white; 
  position: relative;
`;

export const StyledForm = styled.form`
  padding: 1.5rem;
  display: flex;
  flex-grow: 1;
`;

export const typeAreaStyle = {
  borderRadius: '2rem',
  padding: '1.4rem',
  border: 'none',
  outline: 'none',
  background: 'linear-gradient(to left, #eee, white)',
  boxShadow: `0 0 .5rem var(--shadow)`,
  width: '100%',
  fontFamily: 'inherit',
  fontSize: 'inherit'
}

export const StyledSubmitMessage = styled.button`
  width: 5rem;
  height: 5rem;
  background: #0085FF;
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  margin-right: 1rem;
  cursor: pointer;
  transition: .3s;
  transform: translateY(-.17rem);
  box-shadow: 0 0 .5rem var(--sahdow);

  &:hover {
    color: lightgray;
  }

  i {
    transform: rotate(-136deg);
  }
`;