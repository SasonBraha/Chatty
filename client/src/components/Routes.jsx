import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';
import Profile from './Users/Profile/Profile';
import CreateChatRoom from './Chat/CreateChatRoom/CreateChatRoom';
import Chat from './Chat';
import ChatLobby from './Chat/Lobby';
import ErrorPage from './ErrorPage'
import ManageChat from './Admin/ManageChat';

const Routes = () => (
  <Switch>
    <Redirect exact from='/' to='/chat' />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/signin" component={SignIn} />
    <Route exact path="/users/:slug" component={Profile} />
    <Route exact path="/chat" component={ChatLobby} />
    <Route exact path="/chat/:slug" component={Chat} />
    <Route exact path="/admin/chat" component={ManageChat} />
    <Route render={() => (
      <ErrorPage statusCode={404} />
    )} />
  </Switch>
);

export default Routes;
