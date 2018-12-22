import React from 'react';
import Linkify from 'react-linkify';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { StyledMessageContainer, StyledMessage, StyledMetaData, StyledMessageBody, StyledFigure, StyledImage } from './Message.style';
import formatRelative from 'date-fns/formatRelative';
import he from 'date-fns/locale/he';
import { S3_BUCKET_URL } from '../../../utils/config';

const Message = ({ message: { createdBy, file, body, createdAt }, loggedUserId }) => {
  const renderFile = () => {
    return file && (
      <StyledFigure>
        <StyledImage 
          src={file.link && `${S3_BUCKET_URL}/${file.link}`}
          id={file.uniqueFileId}
        />
      </StyledFigure>
    );
  }

  return (
    <StyledMessageContainer>
      <StyledMessage isMine={createdBy._id === loggedUserId}>
        <Link to={`/users/${createdBy.slug}`}>
          <StyledMetaData>{createdBy.displayName}</StyledMetaData>
        </Link>
        <StyledMessageBody>
          {renderFile()}
          <Linkify properties={{ target: '_blank' }}>{body}</Linkify>
        </StyledMessageBody>
        <StyledMetaData alignLeft>{formatRelative(createdAt, new Date(), { locale: he })}</StyledMetaData>
      </StyledMessage>
    </StyledMessageContainer>
  );
}

const mapStateToProps = ({ auth: { userData: { _id: loggedUserId } } }) => ({ loggedUserId });
export default connect(mapStateToProps, null)(Message);
  

 
  

