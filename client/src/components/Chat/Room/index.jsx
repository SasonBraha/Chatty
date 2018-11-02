import React from 'react';
import { StyledRoom } from './Rooms.style';
import ActiveUsers from '../ActiveUsers';
import MessagesList from '../MessagesList';
import AddMessage from '../AddMessage';
import ContentPreview from '../ContentPreview';

const Room = () => (
  <StyledRoom>
    <ActiveUsers />
    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', height: '100%', position: 'relative' }}> 
      <ContentPreview />   
      <MessagesList />
      <AddMessage />
    </div>
  </StyledRoom>
);

export default Room;
