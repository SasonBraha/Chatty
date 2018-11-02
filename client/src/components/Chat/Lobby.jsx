import React from 'react';
import RoomsList from './RoomsList';
import requireAuth from '../Hoc/requireAuth';
import Helmet from 'react-helmet';

const Lobby = () => 
  <>
    <Helmet>
      <title>לובי</title>
    </Helmet>
    <RoomsList />
  </>
;

export default requireAuth(Lobby);