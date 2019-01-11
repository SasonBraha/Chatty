import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ListItemBody = styled.span`
  margin-right: 1rem;
`;

const ListItem = ({ icon, to, body, image, onClick, backgroundOnHover }) => {
  return (
    <StyledListItem backgroundOnHover={backgroundOnHover}>
      {to ? (
        <Link to={to} className="alignVertical">
          {icon ? (
            <i className={icon} />
          ) : (
            <img src={image} alt="תמונת פרופיל" />
          )}
          <ListItemBody>{body}</ListItemBody>
        </Link>
      ) : (
        <div className="ListItemContainer alignVertical" onClick={onClick}>
          {icon ? (
            <i className={icon} />
          ) : (
            <img src={image} alt="תמונת פרופיל" />
          )}
          <ListItemBody>{body}</ListItemBody>
        </div>
      )}
    </StyledListItem>
  );
};

const StyledListItem = styled.li`
  transition: 0.3s;

  &:hover {
    background: ${({ backgroundOnHover }) =>
      backgroundOnHover === 'light'
        ? 'rgba(255, 255, 255, .1)'
        : 'rgba(0, 0, 0, .1)'};
  }

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }

  .alignVertical {
    display: flex;
    align-items: center;
  }

  .ListItemContainer,
  a {
    color: inherit;
    display: block;
    padding: 1rem;
    position: relative;
  }
`;

ListItem.propTypes = {
  icon: PropTypes.string,
  to: PropTypes.string,
  body: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  backgroundOnHover: PropTypes.string,
  image: PropTypes.string,
};

export default ListItem;
