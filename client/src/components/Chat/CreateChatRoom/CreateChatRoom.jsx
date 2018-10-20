import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import { connect } from 'react-redux';
import { setCreateRoomModalState, createChatRoom } from '../../../redux/actions';
import './CreateChatRoom.css';

class CreateChatRoom extends Component {
  state = {
    name: '', 
    status: '',
    storeMessages: ''
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.createChatRoom(this.state)
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { isCreateChatRoomModalOpen, setCreateRoomModalState } = this.props;
    return (
      <Transition in={isCreateChatRoomModalOpen} timeout={300} mountOnEnter={true} unmountOnExit={true}>
        {
          mountState => (
            <div className={`createChatRoom ${mountState}`}>
              <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="שם החדר" name="name" value={this.state.name} onChange={this.handleInputChange} />
                <select name="status" onChange={this.handleInputChange} value={this.state.status}>
                  <option disabled hidden value=''>סטטוס</option>
                  <option value="private">פרטי</option>
                  <option value="public">ציבורי</option>
                </select>
                <select name="storeMessages" onChange={this.handleInputChange} value={this.state.storeMessages}>
                  <option disabled hidden value=''>אחסון הודעות</option>
                  <option value="true">שמור הודעות בחדר זה</option>
                  <option value="false">אל תשמור הודעות בחדר זה</option>
                </select>
                <button type="submit">צור חדר</button>
              </form>
            </div>
          )
        }
      </Transition>
    );
  }
}

const mapStateToProps = ({ chat: { isCreateChatRoomModalOpen } }) => ({ isCreateChatRoomModalOpen });
export default connect(mapStateToProps, { setCreateRoomModalState, createChatRoom })(CreateChatRoom);
