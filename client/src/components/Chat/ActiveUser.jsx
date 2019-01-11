import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ActiveUser = ({ activeUser }) => (
  <Link to={`/users/${activeUser.slug}`}>
    <StyledActiveUser>
      <StyledAvatar src={activeUser.avatar} alt={activeUser.displayName} />
    </StyledActiveUser>
  </Link>
);

const StyledActiveUser = styled.div`
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  position: relative;

  &:not(:first-of-type) {
    margin-top: 0.5rem;
  }

  &:after {
    content: '';
    position: absolute;
    display: block;
    bottom: 0.3rem;
    right: 0.3rem;
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background: var(--success-color);
  }
`;

const StyledAvatar = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  transform: translateY(0.2rem);
`;

export default ActiveUser;
