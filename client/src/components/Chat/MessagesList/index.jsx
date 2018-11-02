import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newMessage, fetchPreviousMessages } from '../../../redux/actions';
import Message from '../Message';
import { StyledMessagesList } from './MessagesList.style';
import MessagesListLoader from './MessagesList.loading';

class MessagesList extends Component {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { messages: oldMessages } = prevProps;
    const { messages } = this.props;
    if (
      // 
      oldMessages.length &&
      // New Message Added
      oldMessages.length !== messages.length &&
      // More Than 1 Message Added
      messages.length - oldMessages.length !== 1
    ) {
      return (
        this.messagesListContainer.scrollHeight -
        this.messagesListContainer.scrollTop
      );
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { messages: oldMessages } = prevProps;
    const { messages } = this.props;
    if (snapshot !== null) {
      return this.messagesListContainer.scrollTop = this.messagesListContainer.scrollHeight - snapshot;
    }
    if (oldMessages.length !== messages.length && messages.length - oldMessages.length !== 1) {
      this.viewEnd.scrollIntoView();
    } else {
      this.viewEnd.scrollIntoView({ behavior: 'smooth' });
    }
  }

  handleScroll = e => {
    const { _id: chatId, messages } = this.props;
    if (e.target.scrollTop < 250 && messages.length) {
      const firstMessageId = messages[0]._id;
      this.props.fetchPreviousMessages(chatId, firstMessageId);
    }
  };

  renderLoader() {
    return Array.from({ length: 20 }).map((_, i) => <MessagesListLoader key={i} />);
  }

  render() {
    const { messages } = this.props;
    return (
      <StyledMessagesList
        onScroll={this.handleScroll}
        innerRef={el => this.messagesListContainer = el}
      >
        {
          messages.length
          ? messages.map((message, i) => <Message key={i} message={message} />)
            : this.renderLoader()
        }
        <div id="viewEnd" ref={el => (this.viewEnd = el)} />
      </StyledMessagesList>
    );
  }
}

const mapStateToProps = ({
  chat: {
    messages,
    currentChatRoom: { _id }
  }
}) => ({ messages, _id });
export default connect(
  mapStateToProps,
  { newMessage, fetchPreviousMessages }
)(MessagesList);
