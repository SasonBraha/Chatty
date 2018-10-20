import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducer from "./reducers";
import reduxThunk from 'redux-thunk';
import async from './middlewares/async';

const store = createStore(
  RootReducer, 
  {},
  composeWithDevTools(applyMiddleware(async, reduxThunk))
); 

export default store;