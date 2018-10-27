import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import List from '../List/List';
import ListItem from '../List/ListItem';

const StyledUserSuggestor = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  background: white;
  bottom: 8.05rem;
  right: 0;
  transition: .3s;
  box-shadow: 0 -.3rem .4rem rgba(0, 0, 0, .07);
`;

class UserSuggestor extends Component {
  render() {
    return (
      <StyledUserSuggestor>
        <List color="black">
          {
            this.props.suggestedUsers.map(user => (
              <ListItem 
                to="/" 
                image={user.avatar} 
                body={user.displayName}
                backgroundOnHover="dark"
                key={user._id} 
              />
            ))
          }
        </List>
      </StyledUserSuggestor>
    );
  }
}

const mapStateToProps = ({ chat: { suggestedUsers } }) => ({ suggestedUsers });
export default connect(mapStateToProps, null)(UserSuggestor);
