import React from 'react';
import { connect } from 'react-redux';
import { StyledContentPreview, StyledImagePreview, StyledFileName, StyledCloseIcon } from './ContentPreview.style';
import { Transition } from 'react-transition-group';
import { handleFileUpload } from '../../../redux/actions';

const ContentPreview = ({ file, handleFileUpload }) => (
  file && (
    <Transition timeout={0} in={file !== null} appear>
      {
        mountState => (
          <StyledContentPreview className={mountState}>
            <StyledCloseIcon 
              className="fas fa-times fa-2x"
              // Remove Current File From Store, Thus Closing Preview
              onClick={_ => handleFileUpload(null)} 
            />
            <StyledImagePreview src={URL.createObjectURL(file)} alt="תמונה להעלאה" />
            <StyledFileName>{file.name}</StyledFileName>
          </StyledContentPreview>
        )
      }
    </Transition>
  )
);

const mapStateToProps = ({ chat: { file } }) => ({ file });
export default connect(mapStateToProps, { handleFileUpload })(ContentPreview);