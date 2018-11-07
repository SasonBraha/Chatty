import React, { Component } from 'react';
import Form from '../Form';
import Field from '../Form/Field';
import Select from '../Form/Select';
import { createChatRoom } from '../../redux/actions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { $mainColor } from '../../resources/themeVariables';

class CreateChatRoom extends Component {
  state = {
    name: '',
    isPrivate: '',
    storeMessages: '',
    image: ''
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.createChatRoom(this.state);
  }
  
  render() {
    return (
      <Form
        icon="fas fa-comments fa-5x"
        legendValue="צור/י חדר חדש"
        buttonValue="צור/י"
        onSubmit={this.handleSubmit}
      >
        <Field 
          name="name"
          value={this.state.name}
          onChange={this.handleInputChange}
          labelValue="שם החדר"
          icon="fas fa-comments"
        />

        <Select
          name="isPrivate"
          onChange={this.handleInputChange}
          value={this.state.isPrivate}
        >
          <option disabled hidden value=''>סוג החדר</option>
          <option value="true">פרטי</option>
          <option value="false">ציבורי</option>
        </Select>

        <Select
          name="storeMessages"
          onChange={this.handleInputChange}
          value={this.state.storeMessages}
        >
          <option disabled hidden value=''>היסטוריית הודעות</option>
          <option value="true">שמור הודעות בחדר זה</option>
          <option value="false">אל תשמור הודעות בחדר זה</option>
        </Select>

        <StyledLabel>
          תמונה
          <input 
            onChange={this.handleInputChange} 
            type="file" 
            accept="image/*"
            name="image"
          />
        </StyledLabel>
      </Form>
    )
  }
}

const StyledLabel = styled.label`
  padding: 1rem;
  width: 100%;
  display: block;
  text-align: center;
  transition: .3s;
  border: .1rem dashed ${$mainColor};
  cursor: pointer;

  &:hover {
    color: white;
    background: ${$mainColor};
    border-color: white;
  }

  input {
    display: none;
  }
`;

export default connect(null, { createChatRoom })(CreateChatRoom);
