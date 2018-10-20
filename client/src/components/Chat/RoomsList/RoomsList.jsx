import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRooms, setCreateRoomModalState } from '../../../redux/actions';
import { StyledRoomsList } from './RoomsList.style';
import RoomsListItem from '../RoomsListItem';
import UserTyping from '../UserTyping/UserTyping';
import RoomsListLoader from './RoomsList.loading';

class RoomsList extends Component {
  componentDidMount() {
    this.props.fetchRooms();
  }

  renderLoader() {
    return Array.from({ length: 20 }).map((_, i) => (
      <RoomsListLoader key={i} />
    ));
  }

  render() {
    const { chatRooms, urlSlug } = this.props;
    return (
      <StyledRoomsList>
        {/* <div>
          <i className="fas fa-users" />
          <i className="fas fa-user-lock" />
        </div> */}
        {
          Object.keys(chatRooms).length
            ? Object.values(chatRooms).map(({ name, slug, lastMessage }) => (
                <RoomsListItem
                  key={slug}
                  slug={slug}
                  roomName={name}
                  lastMessage={lastMessage}
                  selected={urlSlug === slug}
                />
              ))
            : this.renderLoader()
        }
        <UserTyping />
      </StyledRoomsList>
    );
  }
}

const mapStateToProps = ({ chat: { chatRooms, urlSlug } }) => ({
  chatRooms,
  urlSlug
});
export default connect(
  mapStateToProps,
  { fetchRooms, setCreateRoomModalState }
)(RoomsList);
