import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import List from '../List';
import ListItem from '../List/ListItem';

const StyledUserSuggestor = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  background: white;
  bottom: 8.05rem;
  right: 0;
  transition: .3s;
  box-shadow: 0 -.3rem .4rem rgba(0, 0, 0, .07);
`;

const UserSuggestor = ({ suggestedUsers, showUserSuggestor }) => (
  showUserSuggestor && (
    <StyledUserSuggestor>
      <List color="black">
        {
          suggestedUsers.map(user => (
            <ListItem 
              to="/" 
              image={user.avatar} 
              body={user.displayName}
              backgroundOnHover="dark"
              key={user._id} 
            />
          ))
        }
      </List>
    </StyledUserSuggestor>
  )
);

const mapStateToProps = ({ chat: { suggestedUsers, showUserSuggestor } }) => ({ suggestedUsers, showUserSuggestor });
export default connect(mapStateToProps, null)(UserSuggestor);
