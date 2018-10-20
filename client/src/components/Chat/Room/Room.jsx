import React from 'react';
import { StyledRoom, StyledMain } from './Rooms.style';
import ActiveUsers from '../ActiveUsers/ActiveUsers';
import MessagesList from '../MessagesList/MessagesList';
import AddMessage from '../AddMessage/AddMessage';

const Room = () => (
  <StyledRoom>
    <ActiveUsers />
    <StyledMain>    
      <MessagesList />
      <AddMessage />
    </StyledMain>
  </StyledRoom>
);

export default Room;
