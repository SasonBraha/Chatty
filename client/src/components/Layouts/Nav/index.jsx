import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setNavState } from '../../../redux/actions';
import { StyledNav } from './Nav.style';
import List from '../../List';
import ListItem from '../../List/ListItem';
import GoogleSiginIn from '../../Auth/GoogleSignIn';

class Nav extends Component {
  get navItems() {
    const { isAuthenticated, userRole, navItems: { authenticatedNavItems, guestNavItems, adminNavItems } } = this.props;
    let navItemsToRender = isAuthenticated ? authenticatedNavItems : guestNavItems;
    
    if (userRole === 'Admin') {
      navItemsToRender = [...navItemsToRender, ...adminNavItems];
    }

    return navItemsToRender;
  };

  render() {
    return (
      <StyledNav
        navOpen={this.props.isNavOpen}
        onClick={() => window.innerWidth < 992 && this.props.setNavState()}
      >
        <List>
          {
            this.navItems.map(({ to, icon, body }, index) => (
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
  }
}

const mapStateToProps = ({
  root: {
    nav: { isNavOpen, navItems }
  },
  clientStatus: {
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
