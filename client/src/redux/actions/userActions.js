//@ts-check
import { FETCH_USER_PROFILE } from '../constants';
import axios from 'axios';

// Fetch User Profile
export const fetchUserProfile = slug => dispatch => {
  dispatch({
    type: FETCH_USER_PROFILE,
    payload: axios.get(`${process.env.REACT_APP_BASE_URL}/users/${slug}`)
  });
};