import React from 'react';
import { connect } from 'react-redux';
import Fade from '../../FadeIn/Fade';
import AddMessage from '../AddMessage/AddMessage';
import { StyledContentPreview, StyledImagePreview } from './ContentPreview.style';

const ContentPreview = ({ file }) => (
  file && (
    <Fade in={file !== null} timeout={1000}>
      <StyledContentPreview>
        <StyledImagePreview src={URL.createObjectURL(file)} alt="תמונה להעלאה" />
        <AddMessage /> 
      </StyledContentPreview>
    </Fade>
  )
);

const mapStateToProps = ({ chat: { file } }) => ({ file });
export default connect(mapStateToProps, null)(ContentPreview);