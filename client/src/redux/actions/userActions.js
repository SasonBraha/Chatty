//@ts-check
import { FETCH_USER_PROFILE } from '../constants';
import axios from 'axios';
import { API_URL } from '../../utils/config';

// Fetch User Profile
export const fetchUserProfile = slug => dispatch => {
  dispatch({
    type: FETCH_USER_PROFILE,
    payload: axios.get(`${API_URL}/users/${slug}`)
  });
};