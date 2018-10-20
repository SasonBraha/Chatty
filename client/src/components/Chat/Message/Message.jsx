import React from 'react';
import Linkify from 'react-linkify';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { StyledMessageContainer, StyledMessage, StyledMetaData, StyledBody } from './Message.style';
import formatRelative from 'date-fns/formatRelative';
import he from 'date-fns/locale/he';


function isBase64(str) {
  try {
    window.atob(str);
    return true;
  } catch (ex) {
    if (ex.code === 5) {
      return false;
    }
  }
}

function setImageSrc(str) {
  return isBase64(str) 
    ? `data:image/*;charset=utf-8;base64, ${str}`
    : `https://s3.eu-central-1.amazonaws.com/chatty-bucket/${str}`
}


const Message = ({ message: { createdBy, body, createdAt, image }, _id }) => {
  return (
    <StyledMessageContainer>
      <StyledMessage isMine={createdBy._id === _id}>
        <Link to={`/users/${createdBy.slug}`}>
          <StyledMetaData>{createdBy.displayName}</StyledMetaData>
        </Link>
        <StyledBody>
          <figure>
            {image && <img style={{ maxWidth: '100%' }} src={setImageSrc(image)} alt="תמונה להעלאה" />}
          </figure>
          <Linkify properties={{ target: '_blank' }}>
            {body}
          </Linkify>
        </StyledBody>
        <StyledMetaData alignLeft>{formatRelative(createdAt, new Date(), { locale: he })}</StyledMetaData>
      </StyledMessage>
    </StyledMessageContainer>
  );
}

const mapStateToProps = ({ clientStatus: { userData: { _id } } }) => ({ _id });
export default connect(mapStateToProps, null)(Message);
  

 
  

