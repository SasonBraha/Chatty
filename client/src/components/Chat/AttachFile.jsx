import React from 'react';
import { connect } from "react-redux";
import { handleFileUpload } from '../../redux/actions';
import styled from 'styled-components';

const AttachFile = ({ handleFileUpload }) => (
  <StyledAttachFile>
    <input 
      onChange={e => {
        handleFileUpload(e.target.files[0]);
        e.target.value = null;
      }} 
      type="file" 
      accept="image/*"
    />
    <i className="fas fa-paperclip fa-lg"></i>
  </StyledAttachFile>
);

const StyledAttachFile = styled.label`
  padding-right: 2rem;
  cursor: pointer;
  background: inherit;

  input {
    display: none;
  }
`;

export default connect(null, { handleFileUpload })(AttachFile);
