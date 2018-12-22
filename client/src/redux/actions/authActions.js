// @ts-check
import { SET_USER_CREDENTIALS, SET_FORM_ERRORS } from '../constants';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { setToast } from './';
import history from '../../resources/history'; 
import { SIGN_IN_URL } from '../../utils/config';
import { API_URL, LOCAL_STORAGE_ACCESS_TOKEN } from '../../utils/config';

export const registerUser = (formData, captchaElement) => async dispatch => {
  try {
    await axios.post(`${API_URL}/auth/signup`, formData);
    history.push(SIGN_IN_URL);
    dispatch(setToast('נרשמת בהצלחה, כעת תוכל/י להתחבר', 'success'))
  } catch (ex) {
    captchaElement.reset();
    const { data } = ex.response;
    if (data.error && data.error.code === 400) return dispatch(setToast(data.error.message, 'error'));
    dispatch({ type: SET_FORM_ERRORS, payload: data });
  }
};
 
export const googleOAuthLogin = token => async dispatch => {  
  try {
    const accessToken = await axios.post(`${API_URL}/auth/google`, { token: token.getAuthResponse().id_token });
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, accessToken.data);
  } catch (ex) {
    throw ex; 
  }
}

export const loginUser = formData => async dispatch => {
  try {
    const loginCredentials = await axios.post(`${API_URL}/auth/signin`, formData);
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, loginCredentials.data);
  } catch (ex) {
    dispatch(setToast(ex.response.data.error.message, 'error'))
  }
};


export const setUserCredentials = () => dispatch => {
  try {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
    if (accessToken) {
      // Set Authorization Header
      axios.defaults.headers.common['Authorization'] = accessToken;
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
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
};

export const requireLogin = history => dispatch => {
  history.push(SIGN_IN_URL);
  dispatch(setToast('עליך להתחבר על מנת לצפות בדף זה', 'error'));
}; 
