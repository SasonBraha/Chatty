import React from 'react';
import styled from 'styled-components';
import { $mainColor } from '../../Ui/theme/variables';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setNavState } from '../../../redux/actions';
import NavButton from './NavButton';
import HttpLoader from '../../HttpLoader';
import ProfileDropdown from './ProfileDropdown';
import Notifications from './Notifications';

export const StyledHeader = styled.header`
  width: 100%;
  height: 5.5rem;
  display: flex;
  align-items: center;
  z-index: 5;
  background: ${$mainColor};
`;

export const StyledBrand = styled(Link)`
  margin-right: 1rem;
  font-weight: bold;
  font-size: 1.7rem;
  color: white;
`;

export const StyledHeaderOptions = styled.div`
  margin-right: auto;
  display: flex;
  align-items: center;
`;

const Header = props => {
  const { isAuthenticated, setNavState, brand } = props;
  return ( 
    <StyledHeader>
      <NavButton onClick={setNavState} />
      <StyledBrand to="/">{brand}</StyledBrand>
      <HttpLoader color="white" dimensions="3.2rem" />
      {
        isAuthenticated && (
          <StyledHeaderOptions>
            <Notifications />
            <ProfileDropdown />
          </StyledHeaderOptions>
        )
      }
    </StyledHeader>
  );
};

const mapStateToProps = ({
  clientStatus: { isAuthenticated },
  root: {
    header: { brand, isHeaderDropdownOpen },
  }
}) => ({
  isAuthenticated,
  brand,
  isHeaderDropdownOpen
});

export default connect(mapStateToProps, { setNavState })(Header);
