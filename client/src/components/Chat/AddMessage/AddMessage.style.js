import styled from 'styled-components';
import { shadowColor } from '../../Ui/theme/variables';

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

export const StyledMentionUsers = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  background: white;
  bottom: 8.05rem;
  right: 0;
  transition: .3s;
  box-shadow: 0 -.3rem .4rem rgba(0, 0, 0, .07);
`;

export const typeAreaStyle = {
  borderRadius: '2rem',
  padding: '1.4rem',
  border: 'none',
  outline: 'none',
  background: 'linear-gradient(to left, #eee, white)',
  boxShadow: `0 0 .5rem ${shadowColor}`,
  width: '100%'
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
  box-shadow: 0 0 .5rem ${shadowColor};

  &:hover {
    color: lightgray;
  }

  i {
    transform: rotate(-136deg);
  }
`;