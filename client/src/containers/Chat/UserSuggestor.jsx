import React from 'react';
import { connect } from 'react-redux';
import List from '../../components/List';
import ListItem from '../../components/List/ListItem';
import styled from 'styled-components';
import { Transition } from 'react-transition-group';

const UserSuggestor = ({ suggestedUsers, showUserSuggestor }) => (
  <Transition
    in={suggestedUsers.length > 0 && showUserSuggestor}
    mountOnEnter
    unmountOnExit
    timeout={{ enter: 0, exit: 300 }}
  >
    {mountState => (
      <StyledUserSuggestor className={mountState}>
        <List color="black">
          {suggestedUsers.map(({ avatar, displayName, _id }) => (
            <ListItem
              to="/"
              image={avatar}
              body={displayName}
              key={_id}
              backgroundOnHover="dark"
            />
          ))}
        </List>
      </StyledUserSuggestor>
    )}
  </Transition>
);

const StyledUserSuggestor = styled.div`
  position: absolute;
  width: 100%;
  background: white;
  bottom: 8.05rem;
  right: 0;
  transition: 0.3s;
  box-shadow: 0 -0.3rem 0.4rem rgba(0, 0, 0, 0.07);
  transform: translateY(50%);
  opacity: 0;
  min-height: 50px;

  &.entered {
    transform: translateY(0);
    opacity: 1;
    z-index: 2;
  }
`;

const mapStateToProps = ({ chat: { suggestedUsers, showUserSuggestor } }) => ({
  suggestedUsers,
  showUserSuggestor,
});
export default connect(
  mapStateToProps,
  null
)(UserSuggestor);
