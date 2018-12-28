import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRooms } from '../../../redux/actions';
import { StyledRoomsList } from './RoomsList.style';
import RoomsListItem from '../RoomsListItem';
import UserTyping from '../UserTyping';
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
        {
          Object.keys(chatRooms).length
            ? Object.values(chatRooms).map(({ name, slug, lastMessage, image }) => (
                <RoomsListItem
                  key={slug}
                  slug={slug}
                  roomName={name}
                  image={image}
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
  { fetchRooms }
)(RoomsList);
