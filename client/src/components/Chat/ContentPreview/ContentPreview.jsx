import React from 'react';
import { connect } from 'react-redux';
import Fade from '../../FadeIn/Fade';
import AddMessage from '../AddMessage/AddMessage';
import { StyledContentPreview, StyledImagePreview } from './ContentPreview.style';

const ContentPreview = ({ image }) => (
  image && (
    <Fade in={image !== null} timeout={1000}>
      <StyledContentPreview>
        <StyledImagePreview src={URL.createObjectURL(image)} alt="תמונה להעלאה" />
        <AddMessage /> 
      </StyledContentPreview>
    </Fade>
  )
);

const mapStateToProps = ({ chat: { image } }) => ({ image });
export default connect(mapStateToProps, null)(ContentPreview);