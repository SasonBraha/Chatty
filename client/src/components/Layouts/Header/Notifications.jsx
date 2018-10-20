import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Dropdown from '../../Dropdown';
import List from '../../List/List';
import ListItem from '../../List/ListItem';
import { fetchUnseenNotificationsCount, setNotificationsDropdown } from '../../../redux/actions';

const StyledNotifications = styled.div`
  position: relative; 
  cursor: pointer;
`;

const StyledUnseenCount = styled.div`
  position: absolute;
  top: -.8rem;
  right: -1rem;
  background: red;
  border-radius: 50%;
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  width: 1.7rem;
  height: 1.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

class Notifications extends Component {
  componentDidMount() {
    this.props.fetchUnseenNotificationsCount();
  }

  renderNotitifcations() {
    const { items } = this.props.notifications;
    return items.length ? (
      <List color="#6C6C6C">
        {
          items.map(notification => (
            <ListItem 
              to="/" 
              icon='fas fa-bell' 
              body={notification.content}
              backgroundOnHover="dark"
              key={notification._id} 
            />
          ))
        }
      </List>
    ) : 'טוען...'
  }

  render() {
    const { unseenCount, isNotificationsDropdownOpen } = this.props.notifications;
    return (
      <StyledNotifications onClick={this.props.setNotificationsDropdown}>
        <i style={{ color: 'white' }} className="fas fa-bell fa-lg"></i>
        { unseenCount ? <StyledUnseenCount>{unseenCount}</StyledUnseenCount> : <></> }
        <Dropdown isOpen={isNotificationsDropdownOpen} width='30rem'>
          {this.renderNotitifcations()}
        </Dropdown>
      </StyledNotifications>
    );
  }
}

const mapStateToProps = ({ root: { notifications } }) => ({ notifications });
export default connect(mapStateToProps, { fetchUnseenNotificationsCount, setNotificationsDropdown })(Notifications);
