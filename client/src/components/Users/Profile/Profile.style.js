import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  display: grid;
  grid-column-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas: 'userInfo activity activity';
`;

export const UserInfo = styled.div`
  box-shadow: 0 3px 5px 0px rgba(0, 0, 0, 0.2);
  text-align: center;
  padding: 1.5rem;
  position: relative;
  grid-area: userInfo;
`;

export const ProfileImage = styled.img`
  max-width: 100%;
  pointer-events: none;
`;

export const Username = styled.div`
  font-weight: bold;
`;

export const Email = styled.div`
  font-size: 1.5rem;
`;
