import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { S3_BUCKET_URL } from '../../resources/constants';

const StyledRoomListItem = styled(Link)`
  display: block;  
  padding: 1rem;
  transition: .3s;
  color: white;

  &:hover {
    background: #2F353C;
  }

  ${({ selected }) => selected && css`
    border-right: .5rem solid #0079ea;
    background: #2F353C;
  `}
`;

const StyledImage = styled.img`
  width: 3.7rem;
  height: 3.7rem;
  border-radius: 50%;
  border: .1rem solid #484848; 
`;

const StyledName = styled.div`
  color: white;
`;

const StyledLastMessage = styled.div`
  font-size: 1.4rem;
  color: #797676;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RoomsListItem = ({ slug, selected, roomName, lastMessage, image }) => (
  <StyledRoomListItem to={`/chat/${slug}`} key={slug} selected={selected}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <figure>
        <StyledImage src={image.isUploaded ? `${S3_BUCKET_URL}/${image.link}` : image.link} />
      </figure>
      <div style={{ marginRight: '.7rem', transform: 'translateY(-.35rem)', overflow: 'hidden' }}>
        <StyledName>{roomName}</StyledName> 
        <StyledLastMessage>{lastMessage}</StyledLastMessage>
      </div>
    </div>
  </StyledRoomListItem>
);

export default RoomsListItem;

