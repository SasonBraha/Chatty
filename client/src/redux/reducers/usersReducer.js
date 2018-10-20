import { FETCH_USER_PROFILE } from '../constants';

export default (state = {}, action) => {
  switch(action.type) {
    case FETCH_USER_PROFILE:
      return {
        ...state,
        [action.payload.data.slug]: action.payload.data
      }
    
    default: return state;
  }
}
