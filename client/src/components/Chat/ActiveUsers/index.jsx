import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { StyledActiveUsers } from './ActiveUsers.style';
import ActiveUsersLoader from './ActiveUsers.loading';

const ActiveUsers = ({ activeUsers }) => {
  return (
    <StyledActiveUsers>
      {
        activeUsers.length ? (
          activeUsers.map(({ displayName, avatar, slug }) => (
            <Link to={`/users/${slug}`} key={slug}>
              <div className='activeUser'>
                <span className="t">
                  <img className='avatar' src={avatar} alt={`תמונת הפרופיל של ${displayName}`} />
                </span>
              </div>
            </Link>
          ))
        ) : (
          Array.from({ length: 5 }).map((_, i) => (
            <ActiveUsersLoader key={i} />
          ))
        )
      }
    </StyledActiveUsers>
  );
}

const mapStateToProps = ({ chat: { activeUsers } }) => ({ activeUsers });
export default connect(mapStateToProps, null)(ActiveUsers);
