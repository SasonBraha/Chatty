import {
  FETCH_ROOMS,
  FETCH_CURRENT_ROOM,
  NEW_MESSAGE,
  UPDATE_ACTIVE_USERS,
  ADD_TYPING_USER,
  REMOVE_TYPING_USER,
  SET_FILE,
  SET_IS_TYPING,
  RESET_CHAT_STATE,
  SET_IS_FETCHING_PREVIOUS_MESSAGES,
  UNSHIFT_PREVIOUS_MESSAGES,
  SET_IS_MORE_PREVIOUS_MESSAGES,
  SET_CREATE_ROOM_MODAL,
  FETCH_USER_SUGGESTIONS,
  SET_USER_SUGGESTOR
} from '../constants';
import { httpRequestInProgress, setToast } from './'; 
import axios from 'axios';
import socket from '../../socket';
import { API_URL } from '../../utils/config';

export const createChatRoom = formValues => async _ => {
  try {
    const formData = new FormData();
    // Append Form Values To Form Data
    Object.keys(formValues).forEach(key => formData.append(key, formValues[key]));
    
    // Create Chat
    const newRoom = await axios.post(`${API_URL}/chat`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // Redirect To New Chat Room
    window.location.href = `/chat/${newRoom.data.slug}`;
  } catch (ex) {
    throw ex;
  }
};

export const fetchRooms = () => async (dispatch, getState) => {
  const { chat: { chatRooms } } = getState();
  if (!Object.keys(chatRooms).length) {
    dispatch({ type: FETCH_ROOMS, payload: axios.get(`${API_URL}/chat`) });
  }
};

export const fetchChatRoom = slug => async dispatch => {
  const chatRoom = await axios.get(`${API_URL}/chat/${slug}`);
  dispatch({ type: FETCH_CURRENT_ROOM, payload: chatRoom.data });
  document.title = chatRoom.data.name;
};

export const newMessage = messageData => ({
  type: NEW_MESSAGE,
  payload: messageData
});

export const updateActiveUsers = userList => ({
  type: UPDATE_ACTIVE_USERS,
  payload: userList
});

export const updateTypingUsers = (action, displayName) => dispatch => {
  dispatch({ type: action === 'addUser' ? ADD_TYPING_USER : REMOVE_TYPING_USER, payload: displayName });
};

export const handleFileUpload = file => dispatch => {
  // Check For Null Value
  if (file === null) return dispatch({ type: SET_FILE, payload: null });

  const maxFileSize = 5000; // KB
  const allowedFileTypes = [
    'jpg', 'jpeg',
    'png', 'gif',
    'webp', 'bmp'
  ];
  // Check File Type
  const fileType = file.type.split('/')[1];
  if (!allowedFileTypes.includes(fileType)) return dispatch(setToast('הקובץ שנבחר לא נתמך במערכת', 'error'));
  
  // Check File Size
  const fileSizeInKB = Math.floor(file.size / 1024);
  if (fileSizeInKB > maxFileSize) return dispatch(setToast(`הקובץ שנבחר גדול מדי, הגודל המירבי הניתן להעלאה הינו ${Math.ceil(maxFileSize / 1024)}MB`, 'error'));

  dispatch({ type: SET_FILE, payload: file })
};

// Emit Typing
let isTypingTimeout;
export const setIsTyping = () => (dispatch, getState) => {
  const { chat: { isTyping } } = getState();
  if (isTyping) {
    clearTimeout(isTypingTimeout);
    isTypingTimeout = setTimeout(() => {
      socket.emit('client:userStoppedTyping');
      dispatch({ type: SET_IS_TYPING, payload: false });
    }, 650);
  } else {
    dispatch({ type: SET_IS_TYPING, payload: true });
    dispatch(setIsTyping());
    socket.emit('client:userIsTyping');
  }
};

// Submit Message
export const submitMessage = body => async (dispatch, getState) => {
  const { chat: { file } } = getState();
  socket.emit('client:newMessage', { body, file });
  dispatch({ type: SET_FILE, payload: null })
};

export const resetChatState = () => ({
  type: RESET_CHAT_STATE
});

export const fetchPreviousMessages = (chatId, messageId) => async (dispatch, getState) => {
  try {
    const { chat: { isFetchingPreviousMessages, isMorePreviousMessages } } = getState();
    // Check If There's More Previous Messages && Not Currently Fetching
    if (!isFetchingPreviousMessages && isMorePreviousMessages) {
      // Set Currently Fetching
      dispatch({ type: SET_IS_FETCHING_PREVIOUS_MESSAGES });
      dispatch(httpRequestInProgress(true));
      // Fetch Messages
      const previousMessages = await axios.get(`${API_URL}/chat/${chatId}/${messageId}`);
      // If Messages
      if (previousMessages.data.length) {
        // Add Messages To Store
        dispatch({ type: UNSHIFT_PREVIOUS_MESSAGES, payload: previousMessages.data });
        // Set Currently Fetching
        dispatch({ type: SET_IS_FETCHING_PREVIOUS_MESSAGES });
      } else {
        dispatch({ type: SET_IS_MORE_PREVIOUS_MESSAGES, payload: false });
        dispatch({ type: SET_IS_FETCHING_PREVIOUS_MESSAGES });
      }
      dispatch(httpRequestInProgress(false));
    }
  } catch (ex) {
    dispatch(httpRequestInProgress(false));
    throw ex;
  }
};

export const setCreateRoomModal = () => ({
  type: SET_CREATE_ROOM_MODAL
});

let fetchUserSuggestionsTimeout = null;
export const fetchUserSuggestions = displayName => dispatch => {
  clearTimeout(fetchUserSuggestionsTimeout);
  fetchUserSuggestionsTimeout = setTimeout(() => {
    if (displayName.trim().length) {
      dispatch({
        type: FETCH_USER_SUGGESTIONS,
        payload: axios.get(`${API_URL}/users?displayName=${displayName}&limit=5`)
      });
    }
  }, 400)
}

export const setUserSuggestor = boolean => ({
  type: SET_USER_SUGGESTOR,
  payload: boolean
});

