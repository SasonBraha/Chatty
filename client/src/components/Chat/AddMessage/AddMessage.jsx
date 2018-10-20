import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setIsTyping, submitMessage, fetchUserSuggestions } from '../../../redux/actions';
import UplaodImage from '../UploadImage/UploadImage';
import { StyledAddMessageContainer, StyledForm, typeAreaStyle, StyledSubmitMessage, StyledMentionUsers } from './AddMessage.style';
import InputTrigger from 'react-input-trigger';
import List from '../../List/List';
import ListItem from '../../List/ListItem';

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
        <StyledMentionUsers>
          { this.state.showSuggestor && (
              <List color="black">
                {
                  this.props.suggestedUsers.map(user => (
                    <ListItem 
                      to="/" 
                      image={user.avatar} 
                      body={user.displayName}
                      backgroundOnHover="dark"
                      key={user._id} 
                    />
                  ))
                }
              </List>
          )}
        </StyledMentionUsers>
        <UplaodImage />
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

const mapStateToProps = ({ chat: { isTyping, suggestedUsers } }) => ({ 
  isTyping, 
  suggestedUsers
});
export default connect(mapStateToProps, { setIsTyping, submitMessage, fetchUserSuggestions })(AddMessage);

