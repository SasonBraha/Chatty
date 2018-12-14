import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignUp from '../containers/Auth/SignUp';
import SignIn from '../containers/Auth/SignIn';
import Profile from './Users/Profile';
import Chat from './Chat';
import ChatLobby from './Chat/Lobby';
import ErrorPage from './ErrorPage'
import ManageChat from './Admin/ManageChat';
import CreateChatRoom from './Chat/CreateChatRoom';

const Routes = () => (
  <Switch>
    <Redirect exact from='/' to='/chat' />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/signin" component={SignIn} />
    <Route exact path="/users/:slug" component={Profile} />
    <Route exact path="/chat" component={ChatLobby} />
    <Route exact path="/chat/:slug" component={Chat} />
    <Route exact path="/create" component={CreateChatRoom} />
    <Route exact path="/admin/chat" component={ManageChat} />
    <Route render={() => (
      <ErrorPage statusCode={404} />
    )} />
  </Switch>
);

export default Routes;
