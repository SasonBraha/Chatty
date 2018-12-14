//@ts-check
import {
  SET_NAV_STATE,
  RESET_DROPDOWN,
  SET_HEADER_DROPDOWN,
  SET_TOAST,
  REMOVE_TOAST,
  HTTP_REQUEST_IN_PROGRESS,
  FETCH_UNSEEN_NOTIFICATIONS_COUNT,
  SET_NOTIFICATIONS_DROPDOWN,
  FETCH_NOTIFICATIONS
} from '../constants';
import axios from 'axios'; 
import { generateId } from '../../utils';
import { API_URL } from '../../utils/config';

// Control Nav State
export const setNavState = () => ({
  type: SET_NAV_STATE
});

// Reset Dropdown (Global)
export const resetDropdown = () => dispatch => {
  dispatch({ type: RESET_DROPDOWN });
};

// Control Header Dropdown
export const setHeaderDropdown = () => ({
  type: SET_HEADER_DROPDOWN
});

// Display Toast
export const setToast = (message, type) => {
  return {
    type: SET_TOAST,
    payload: {
      message,
      type,
      id: generateId()
    }
  };
};

// Remove Toast
export const removeToast = id => ({
  type: REMOVE_TOAST,
  payload: id
});

export const httpRequestInProgress = bool => ({
  type: HTTP_REQUEST_IN_PROGRESS,
  payload: bool
});

// Fetch Unseen Notifications Count
export const fetchUnseenNotificationsCount = () => ({
  type: FETCH_UNSEEN_NOTIFICATIONS_COUNT,
  payload: axios.get(`${API_URL}/notifications/unseen`)
});

// Set Notification Dropdown && Fetch Notifications
export const setNotificationsDropdown = () => async (dispatch, getState) => {
  // Open Notifications Dropdown
  dispatch({ type: SET_NOTIFICATIONS_DROPDOWN });
  const { global: { notifications: { items } } } = getState();
  // Fetch Notifications
  if (!items.length) {
    dispatch({ type: FETCH_NOTIFICATIONS, payload: axios.get(`${API_URL}/notifications`) })
  }
}

export const showConsoleWarning = () => dispatch => {
  console.log('%c!עצור/י', 'color: red; font-size: 70px; font-weight: bold; direction: rtl');
  console.log(`%cהפיצ'ר הנ"ל מיועד למפתחים, אם מישהו אמר לך להדביק כאן קוד - הוא מנסה לפרוץ לך לחשבון`, 'font-size: 20px; font-weight: bold');
}

