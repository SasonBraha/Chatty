import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setIsTyping, submitMessage, fetchUserSuggestions } from '../../../redux/actions';
import AttachFile from '../AttachFile';
import { StyledAddMessageContainer, StyledForm, typeAreaStyle, StyledSubmitMessage } from './AddMessage.style';
import InputTrigger from 'react-input-trigger';
import UserSuggestor from '../UserSuggestor';

class AddMessage extends Component {
  state = { 
    typeAreaValue: '',
    showSuggestor: false
  }

  onInputChange = e => {
    this.props.setIsTyping();
    this.setState({ typeAreaValue: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.submitMessage(this.state.typeAreaValue);
    this.setState({ typeAreaValue: '' })
  }

  onMentionUser = triggerData => {
    const { text } = triggerData;
    this.state.showSuggestor && this.props.fetchUserSuggestions(text);
  }

  render() {
    return (
      <StyledAddMessageContainer>
        { this.state.showSuggestor && <UserSuggestor /> }
        <AttachFile />
        <StyledForm onSubmit={this.handleSubmit}>
          <InputTrigger
            trigger={{ keyCode: 50, shiftKey: true }}
            onStart={() => this.setState({ showSuggestor: true })}
            onType={this.onMentionUser}
            onCancel={() => this.setState({ showSuggestor: false })}
            style={{ flexGrow: 1 }}
          >
            <input
              value={this.state.typeAreaValue}
              onChange={this.onInputChange}
              placeholder='הזן הודעה ולחץ Enter'
              style={typeAreaStyle}
            />
          </InputTrigger>
          <StyledSubmitMessage>
            <i className="fas fa-location-arrow"></i>
          </StyledSubmitMessage> 
        </StyledForm>
      </StyledAddMessageContainer>
    );
  }
}

const mapStateToProps = ({ chat: { isTyping } }) => ({ 
  isTyping
});
export default connect(mapStateToProps, { setIsTyping, submitMessage, fetchUserSuggestions })(AddMessage);

