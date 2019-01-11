import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchRooms } from '../../redux/actions';
import RoomsListItem from '../../components/Chat/RoomsListItem';
import UsersTyping from './UsersTyping';
import RoomsListLoader from '../../components/Chat/RoomsList.loader';
import styled from 'styled-components';

const RoomsList = ({ chatRooms, urlSlug, fetchRooms }) => {
  useEffect(() => {
    fetchRooms();
  });

  return (
    <StyledRoomsList>
      {Object.keys(chatRooms).length
        ? Object.values(chatRooms).map(chatRoom => (
            <RoomsListItem
              chatRoom={chatRoom}
              currentUrl={urlSlug}
              key={chatRoom._id}
            />
          ))
        : Array.from({ length: 20 }).map((_, i) => <RoomsListLoader key={i} />)}
      <UsersTyping />
    </StyledRoomsList>
  );
};

const StyledRoomsList = styled.div`
  flex-shrink: 0;
  width: 25rem;
  height: 100%;
  background: var(--rooms-list-color);
  z-index: 2;
  overflow-y: auto;
  position: relative;
`;

const mapStateToProps = ({ chat: { chatRooms, urlSlug } }) => ({
  chatRooms,
  urlSlug,
});
export default connect(
  mapStateToProps,
  { fetchRooms }
)(RoomsList);
