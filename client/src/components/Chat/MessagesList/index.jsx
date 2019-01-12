import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newMessage, fetchPreviousMessages } from '../../../redux/actions';
import Message from '../Message';
import { StyledMessagesList, StyledInfoMessage } from './MessagesList.style';
import MessagesListLoader from './MessagesList.loading';

class MessagesList extends Component {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { messages: oldMessages } = prevProps;
    const { messages } = this.props;
    if (oldMessages.length && messages.length - oldMessages.length !== 1) {
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
      return (this.messagesListContainer.scrollTop =
        this.messagesListContainer.scrollHeight - snapshot);
    }

    if (oldMessages.length !== messages.length) {
      this.viewEnd.scrollIntoView();
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
    return Array.from({ length: 20 }).map((_, i) => (
      <MessagesListLoader key={i} />
    ));
  }

  render() {
    const { messages, storeMessages, isFetched } = this.props;
    return (
      <StyledMessagesList
        onScroll={this.handleScroll}
        innerRef={el => (this.messagesListContainer = el)}
      >
        {isFetched && !storeMessages && (
          <StyledInfoMessage background="#ff9503">
            בחדר זה לא נשמרת היסטוריית ההודעות
          </StyledInfoMessage>
        )}
        {isFetched && !messages.length && (
          <StyledInfoMessage background="#007bff">
            טרם נשלחו הודעות בחדר זה
          </StyledInfoMessage>
        )}
        {messages.length ? (
          messages.map((message, i) => <Message key={i} message={message} />)
        ) : isFetched ? (
          <></>
        ) : (
          this.renderLoader()
        )}
        <div id="viewEnd" ref={el => (this.viewEnd = el)} />
      </StyledMessagesList>
    );
  }
}

const mapStateToProps = ({
  chat: {
    messages,
    isFetched,
    currentChat: { _id, storeMessages },
  },
}) => ({ messages, _id, storeMessages, isFetched });
export default connect(
  mapStateToProps,
  { newMessage, fetchPreviousMessages }
)(MessagesList);
