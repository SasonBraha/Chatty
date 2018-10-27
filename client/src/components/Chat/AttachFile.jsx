import React from 'react';
import { connect } from "react-redux";
import { handleFileUpload } from '../../redux/actions';
import styled from 'styled-components';

export const StyledAttachFile = styled.label`
  padding-right: 2rem;
  cursor: pointer;
  background: inherit;

  input {
    display: none;
  }
`;

const AttachFile = ({ handleFileUpload }) => {
  const handleFileChange = e => {
    // Set File To Store
    handleFileUpload(e.target.files[0]);
    // Reset Value
    e.target.value = null;
  } 

  return (
    <StyledAttachFile>
      <input 
        onChange={handleFileChange} 
        type="file" 
        accept="image/*"
      />
      <i className="fas fa-paperclip fa-lg"></i>
    </StyledAttachFile>
  );
}

export default connect(null, { handleFileUpload })(AttachFile);
