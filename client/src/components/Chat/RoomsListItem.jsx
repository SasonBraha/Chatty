import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { S3_BUCKET_URL } from '../../utils/config';

const RoomsListItem = ({ currentUrl, chatRoom }) => {
  const { slug, image, name, lastMessage } = chatRoom;
  return (
    <StyledRoomListItem
      to={`/chat/${slug}`}
      key={slug}
      selected={currentUrl === slug}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <figure>
          <StyledImage
            src={
              image.isUploaded ? `${S3_BUCKET_URL}/${image.link}` : image.link
            }
          />
        </figure>
        <div
          style={{
            marginRight: '.7rem',
            transform: 'translateY(-.35rem)',
            overflow: 'hidden',
          }}
        >
          <StyledName>{name}</StyledName>
          <StyledLastMessage>{lastMessage}</StyledLastMessage>
        </div>
      </div>
    </StyledRoomListItem>
  );
};

const StyledRoomListItem = styled(Link)`
  display: block;
  padding: 1rem;
  transition: 0.3s;
  color: white;

  &:hover {
    background: var(--active-users-color);
  }

  ${({ selected }) =>
    selected &&
    css`
      border-right: 0.5rem solid #0079ea;
      background: var(--active-users-color);
    `}
`;

const StyledImage = styled.img`
  width: 3.7rem;
  height: 3.7rem;
  border-radius: 50%;
  border: 0.1rem solid #484848;
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

export default RoomsListItem;
