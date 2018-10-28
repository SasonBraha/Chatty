import React, { Component } from 'react';
import Room from './Room/Room';
import RoomsList from './RoomsList/RoomsList';
import { connect } from 'react-redux';
import {
  resetChatState,
  updateActiveUsers,
  updateTypingUsers,
  newMessage,
  fetchChatRoom
} from '../../redux/actions';
import requireAuth from '../Hoc/requireAuth';
import CreateChatRoom from './CreateChatRoom/CreateChatRoom';
import ContentPreview from './ContentPreview/ContentPreview';
import socket from '../../resources/socket';
import Helmet from 'react-helmet';
import { S3_BUCKET_URL } from '../../resources/constants';

class Chat extends Component {
  initChat() {
    const { fetchChatRoom, updateActiveUsers, updateTypingUsers, newMessage, urlSlug } = this.props;
    socket
      .emit('client:joinChatRoom', urlSlug)
      .on('server:updateUserList', activeUsers => updateActiveUsers(activeUsers))
      .on('server:userIsTyping', displayName => updateTypingUsers('addUser', displayName))
      .on('server:userStoppedTyping', displayName => updateTypingUsers('removeUser', displayName))
      .on('server:newMessage', messageData => newMessage(messageData))
      .on('server:fileUploaded', ({ fileData, uniqueFileId }) => {
        document.getElementById(uniqueFileId).src = `${S3_BUCKET_URL}/${fileData.link}`;
      });
    fetchChatRoom(urlSlug);
  }

  resetChat() {
    socket.emit('client:leaveChatRoom');
    socket.removeAllListeners();
    this.props.resetChatState();
  }

  shouldComponentUpdate(nextProps, nextState) { 
    return nextProps.urlSlug !== this.props.urlSlug;
  }

  componentDidMount() {
    this.initChat();
    window.addEventListener('beforeunload', this.resetChat);
  }

  componentDidUpdate() {
    //? No Need For Conditional Due To { <shouldComponentUpdate> }
    this.resetChat();
    this.initChat();

  }

  componentWillUnmount() {
    this.resetChat();
    window.removeEventListener('beforeunload', this.resetChat);
  }

  render() {
    return (
      <div style={{ display: 'flex', height: '100%' }}>
        <Helmet>
          <title>{this.props.urlSlug}</title>
        </Helmet>
        <RoomsList />
        <Room />
        <CreateChatRoom />
        <ContentPreview />
      </div>
    );
  }
}

const mapStateToProps = ({ chat: { urlSlug } }) => ({ urlSlug });
export default connect(
  mapStateToProps,
  { 
    resetChatState,
    updateActiveUsers,
    updateTypingUsers,
    newMessage,
    fetchChatRoom 
  }
)(requireAuth(Chat));
