import React, { Component } from 'react';
import styled from 'styled-components';
import { ProfileWrapper, UserInfo, ProfileImage, Username, Email } from './Profile.style';
import { connect } from 'react-redux';
import { fetchUserProfile } from '../../../redux/actions';
import formatRelative from 'date-fns/formatRelative';
import he from 'date-fns/locale/he';
import { Helmet } from 'react-helmet';

const StyledProfile = styled.div`
  height: 100%;
  padding: 1rem;
  background: white;
  margin: 0 auto;
  box-shadow: 0 0 1rem black;    
`;

class Profile extends Component {
  componentDidMount() {
    const { users, fetchUserProfile, match: { params: { slug } } } = this.props;
    !users[slug] && fetchUserProfile(slug);
  }

  render() {
    const { users, match: { params: { slug } } } = this.props;
    if (users[slug]) {
      const { displayName, avatar, email, createdAt } = users[slug];
      return (
        <StyledProfile>
          <Helmet>
            <title>הפרופיל של {displayName}</title>
          </Helmet>
          <ProfileWrapper>
            <UserInfo>
              <figure>
                <ProfileImage src={avatar} alt={`תמונת הפרופיל של ${displayName}`} />
              </figure>
              <Username>{displayName}</Username>
              <Email>{email}</Email>
              <span>הצטרפות: {formatRelative(createdAt, new Date(), { locale: he })}</span>
            </UserInfo>
          </ProfileWrapper> 
        </StyledProfile>
      );
    } 
    return <div>טוען...</div>
  }
}

const mapStateToProps = ({ users }) => ({ users });
export default connect(mapStateToProps, { fetchUserProfile })(Profile);
