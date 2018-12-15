import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ActiveUser from '../../components/Chat/ActiveUser';
import ActiveUsersLoader from '../../components/Chat/ActiveUsers.loader';

const ActiveUsers = ({ activeUsers }) => (
  <StyledActiveUsers>
    {
      activeUsers.length
        ? activeUsers.map(activeUser => <ActiveUser activeUser={activeUser} key={activeUser.slug} />)
        : Array.from({ length: 20 }).map((_, i) => <ActiveUsersLoader key={i} />) 
    }
  </StyledActiveUsers>
);

const StyledActiveUsers = styled.div`
  padding: 0 2rem 0 2rem; 
  text-align: center;
  height: 100%;
  background: var(--active-users-color);
  padding: 0.5rem;
  overflow-y: auto;
  overflow-x: hidden;
  transition: 0.25s;
  color: white;
`;

const mapStateToProps = ({ chat: { activeUsers } }) => ({ activeUsers });
export default connect(mapStateToProps, null)(ActiveUsers);