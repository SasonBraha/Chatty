import React, { Component } from 'react';
import { connect } from "react-redux";
import { setImagePreview } from '../../../redux/actions';
import { StyledUplaodImage } from './UploadImage.style';

class UploadImage extends Component {
  handleFileChange = e => {
    // Set Image To Store
    this.props.setImagePreview(e.target.files[0]);
    // Reset Input
    e.target.value = null;
  }

  render() {
    return (
      <StyledUplaodImage>
        <input 
          onChange={this.handleFileChange} 
          type="file" 
          accept="image/*"
        />
        <i className="fas fa-paperclip fa-lg"></i>
      </StyledUplaodImage>
    );
  }
}

export default connect(null, { setImagePreview })(UploadImage);
