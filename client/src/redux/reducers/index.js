import { combineReducers } from 'redux';
import authReducer from './authReducer';
import chatReducer from './chatReducer';
import globalReducer from './globalReducer'; 
import usersReducer from './usersReducer';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
  auth: authReducer,
  chat: chatReducer,
  global: globalReducer,
  users: usersReducer,
  router: routerReducer,
  form: formReducer
}); 