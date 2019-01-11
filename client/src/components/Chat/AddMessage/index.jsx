import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  setIsTyping,
  submitMessage,
  fetchUserSuggestions,
  setUserSuggestor,
} from '../../../redux/actions';
import AttachFile from '../AttachFile';
import {
  StyledAddMessageContainer,
  StyledForm,
  typeAreaStyle,
  StyledSubmitMessage,
} from './AddMessage.style';
import InputTrigger from 'react-input-trigger';
import UserSuggestor from '../../../containers/Chat/UserSuggestor';

class AddMessage extends Component {
  state = {
    typeAreaValue: '',
  };

  onInputChange = e => {
    this.props.setIsTyping();
    this.setState({ typeAreaValue: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.submitMessage(this.state.typeAreaValue);
    this.setState({ typeAreaValue: '' });
  };

  onMentionUser = triggerData => {
    const { showUserSuggestor, fetchUserSuggestions } = this.props;
    showUserSuggestor && fetchUserSuggestions(triggerData.text);
  };

  render() {
    return (
      <StyledAddMessageContainer>
        <UserSuggestor />
        <AttachFile />
        <StyledForm onSubmit={this.handleSubmit}>
          <InputTrigger
            trigger={{ keyCode: 50, shiftKey: true }}
            onStart={() => this.props.setUserSuggestor(true)}
            onType={this.onMentionUser}
            onCancel={() => this.props.setUserSuggestor(false)}
            style={{ flexGrow: 1 }}
          >
            <input
              value={this.state.typeAreaValue}
              onChange={this.onInputChange}
              placeholder="הזן הודעה ולחץ Enter"
              style={typeAreaStyle}
            />
          </InputTrigger>
          <StyledSubmitMessage>
            <i className="fas fa-location-arrow" />
          </StyledSubmitMessage>
        </StyledForm>
      </StyledAddMessageContainer>
    );
  }
}

const mapStateToProps = ({ chat: { isTyping, showUserSuggestor } }) => ({
  isTyping,
  showUserSuggestor,
});
export default connect(
  mapStateToProps,
  { setIsTyping, submitMessage, fetchUserSuggestions, setUserSuggestor }
)(AddMessage);
