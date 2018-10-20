import { SET_USER_CREDENTIALS, REMOVE_USER_CREDENTIALS } from '../constants';

const initialState = {
  isAuthenticated: false,
  userData: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_USER_CREDENTIALS:
      return {
        ...state,
        isAuthenticated: true,
        userData: action.payload
      }

    case REMOVE_USER_CREDENTIALS:
      return {
        ...initialState
      }

    default: 
      return state;
  }
}