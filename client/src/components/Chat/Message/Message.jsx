import React, { Component } from 'react';
import Linkify from 'react-linkify';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { StyledMessageContainer, StyledMessage, StyledMetaData, StyledMessageBody, StyledFigure, StyledImage } from './Message.style';
import formatRelative from 'date-fns/formatRelative';
import he from 'date-fns/locale/he';

const Message = ({ message: { createdBy, file, body, createdAt }, loggedUserId }) => {
  const renderFile = () => {
    return file && (
      <StyledFigure>
        <StyledImage 
          src={`https://s3.eu-central-1.amazonaws.com/chatty-bucket/${file.link}`}
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

const mapStateToProps = ({ clientStatus: { userData: { _id: loggedUserId } } }) => ({ loggedUserId });
export default connect(mapStateToProps, null)(Message);
  

 
  

