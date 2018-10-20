import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Dropdown from '../../Dropdown';
import List from '../../List/List';
import ListItem from '../../List/ListItem';
import { setHeaderDropdown, removeUserCredentials } from '../../../redux/actions';

export const StyledProfile = styled.div`
  margin-left: 1.5rem;
  margin-right: 1.3rem;
  position: relative;
  cursor: pointer;
`;

export const StyledProfileImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  vertical-align: middle;
  position: relative;
  pointer-events: none;
`;

const ProfileDropdown = ({ setHeaderDropdown, userData, isHeaderDropdownOpen, removeUserCredentials }) => (
  <StyledProfile onClick={setHeaderDropdown}>
    <StyledProfileImg src={userData.avatar} alt={`האווטאר של ${userData.displayName}`} />
    <Dropdown isOpen={isHeaderDropdownOpen}>
      <List color="#6C6C6C">
        <ListItem
          to={`/users/${userData.slug}`}
          body="הפרופיל שלי"
          icon="fas fa-user"
          backgroundOnHover="dark"
        />
        <ListItem
          to="/users/profile/settings"
          body="הגדרות"
          icon="fas fa-cog"
          backgroundOnHover="dark"
        />
        <ListItem
          body="התנתק"
          icon="fas fa-sign-out-alt"
          onClick={removeUserCredentials}
          backgroundOnHover="dark"
        />
      </List>
    </Dropdown>
  </StyledProfile>
);

const mapStateToProps = ({
  clientStatus: { userData },
  root: {
    header: { isHeaderDropdownOpen } 
  }
}) => ({ userData, isHeaderDropdownOpen });

export default connect(mapStateToProps, { setHeaderDropdown, removeUserCredentials })(ProfileDropdown);

