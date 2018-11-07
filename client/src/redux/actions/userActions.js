//@ts-check
import { FETCH_USER_PROFILE } from '../constants';
import axios from 'axios';
import { BASE_URL } from '../../resources/constants';

// Fetch User Profile
export const fetchUserProfile = slug => dispatch => {
  dispatch({
    type: FETCH_USER_PROFILE,
    payload: axios.get(`${BASE_URL}/users/${slug}`)
  });
};