import React, { useEffect } from 'react';
import RoomsList from '../../containers/Chat/RoomsList';
import requireAuth from '../../containers/Hoc/requireAuth';

const Lobby = () => {
  useEffect(() => {
    document.title = 'לובי';
  });

  return <RoomsList />;
};
export default requireAuth(Lobby);
