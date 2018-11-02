import styled from 'styled-components';
import media from '../../../resources/media';

export const StyledActiveUsers = styled.div`
  padding: 0 2rem 0 2rem; 
  text-align: center;
  height: 100%;
  background: #2F353C;
  padding: 0.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  transition: 0.25s;
  color: white;

  ${media.phone` display: none`};

  .activeUser {
    padding: 0.5rem;
    margin-top: 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;

    &:first-child {
      margin-top: 0;
    }

    .avatar {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      transform: translateY(0.2rem);
    }
  }

  .t {
    position: relative;

    &::after {
      content: '';
      display: block;
      width: .75rem;
      height: .75rem;
      border-radius: 50%;
      background: #05ad05;
      position: absolute;
      bottom: .3rem;
      right: 0;
    }
  }
`;
