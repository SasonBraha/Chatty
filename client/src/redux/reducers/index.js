import { combineReducers } from 'redux';
import authReducer from './authReducer';
import chatReducer from './chatReducer';
import rootReducer from './rootReducer'; 
import usersReducer from './usersReducer';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  clientStatus: authReducer,
  chat: chatReducer,
  root: rootReducer,
  users: usersReducer,
  router: routerReducer,
}); 