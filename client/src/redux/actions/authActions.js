// @ts-check
import { SET_USER_CREDENTIALS, SET_FORM_ERRORS } from '../constants';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { setToast } from './';
import history from '../../resources/history'; 
import { BASE_URL, ACCESS_TOKEN, LAST_URL_PATH, SIGN_IN_URL } from '../../resources/constants';

export const registerUser = formData => async dispatch => {
  try {
    await axios.post(`${BASE_URL}/auth/signup`, formData);
    history.push(SIGN_IN_URL);
    dispatch(setToast('נרשמת בהצלחה, כעת תוכל/י להתחבר'))
  } catch (ex) {
    dispatch({ type: SET_FORM_ERRORS, payload: ex.response.data });
  }
};
 
export const googleOAuthLogin = token => async dispatch => {  
  try {
    const accessToken = await axios.post(`${BASE_URL}/auth/google`, { token: token.getAuthResponse().id_token });
    localStorage.setItem(ACCESS_TOKEN, accessToken.data); 
    window.location.href = localStorage.getItem(LAST_URL_PATH) || '/'; 
    localStorage.removeItem(LAST_URL_PATH);
  } catch (ex) {
    throw ex; 
  }
}

export const loginUser = formData => async dispatch => {
  try {
    const loginCredentials = await axios.post(`${BASE_URL}/auth/signin`, formData);
    localStorage.setItem(ACCESS_TOKEN, loginCredentials.data);
    window.location.href = localStorage.getItem(LAST_URL_PATH) || ''; 
    localStorage.removeItem(LAST_URL_PATH);
  } catch (ex) {
    dispatch(setToast(ex.response.data.error.message))
  }
};


export const setUserCredentials = () => dispatch => {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      // Set Authorization Header
      axios.defaults.headers.common['Authorization'] = accessToken;
      // Handle Invalid Tokens
      axios.interceptors.response.use(null, error => {
        if (error.response.status === 401) {
          dispatch(removeUserCredentials(SIGN_IN_URL));
        }
      })
      // Set User Data To Store
      dispatch({ type: SET_USER_CREDENTIALS, payload: jwtDecode(accessToken) });
    } else {
      // Remove Authorization Header
      delete axios.defaults.headers.common['Authorization'];
    }
  } catch(ex) {
    // In Case Of Any Error, Remove User Credentials And Logout
    dispatch(removeUserCredentials());
  }
};

export const removeUserCredentials = (urlPath = '/') => dispatch => {
  window.location.href = urlPath;
  localStorage.removeItem(ACCESS_TOKEN);
};

export const requireLogin = history => dispatch => {
  history.push(SIGN_IN_URL);
  dispatch(setToast('עליך להתחבר על מנת לצפות בדף זה'));
}; 
