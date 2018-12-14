import React from 'react';
import { connect } from 'react-redux';
import { setNavState } from '../../../redux/actions';
import { StyledNav } from './Nav.style';
import List from '../../../components/List';
import ListItem from '../../../components/List/ListItem';
import GoogleSiginIn from '../../Auth/GoogleSignIn';

const navItems = props => {
  const { isAuthenticated, userRole, navItems: { authenticatedNavItems, guestNavItems, adminNavItems } } = props;
  let navItemsToRender = isAuthenticated ? authenticatedNavItems : guestNavItems;
  if (userRole === 'Admin') navItemsToRender = [...navItemsToRender, ...adminNavItems];
  return navItemsToRender;
};

const Nav = props => (
  <StyledNav
    navOpen={props.isNavOpen}
    onClick={() => window.innerWidth < 992 && props.setNavState()}
  >
    <List>
      {
        navItems(props).map(({ to, icon, body }, index) => (
          <ListItem
            key={index}
            to={to}
            icon={icon}
            body={body}
            backgroundOnHover="light"
          />
        ))
      }
    </List>
    <div className="oAuthOptions" style={{ padding: '0 .7rem' }}>
      <GoogleSiginIn />
    </div>
  </StyledNav>
);


const mapStateToProps = ({
  global: {
    nav: { isNavOpen, navItems }
  },
  auth: {
    isAuthenticated,
    userData: { role: userRole }
  }
}) => ({
  isNavOpen,
  navItems,
  isAuthenticated, 
  userRole
});

export default connect(
  mapStateToProps,
  { setNavState }
)(Nav);
