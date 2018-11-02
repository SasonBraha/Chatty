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
  SET_CREATE_ROOM_MODAL_STATE,
  FETCH_USER_SUGGESTIONS,
  SET_USER_SUGGESTOR
} from '../constants';
import { httpRequestInProgress, setToast } from './'; 
import axios from 'axios';
import socket from '../../resources/socket';

export const createChatRoom = data => dispatch => {
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/chat`, data)
    .then(createdChatRoom => console.log(createdChatRoom));
};

export const fetchRooms = () => async (dispatch, getState) => {
  const {
    chat: { chatRooms }
  } = getState();
  !Object.keys(chatRooms).length &&
    dispatch({ type: FETCH_ROOMS, payload: axios.get(`${process.env.REACT_APP_BASE_URL}/chat`) });
};

export const fetchChatRoom = slug => async dispatch => {
  const chatRoom = await axios.get(`${process.env.REACT_APP_BASE_URL}/chat/${slug}`);
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
  const actionType =
    action === 'addUser' ? ADD_TYPING_USER : REMOVE_TYPING_USER;
  dispatch({ type: actionType, payload: displayName });
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
  if (!allowedFileTypes.includes(fileType)) return dispatch(setToast('הקובץ שנבחר לא נתמך במערכת'));
  
  // Check File Size
  const fileSizeInKB = Math.floor(file.size / 1024);
  if (fileSizeInKB > maxFileSize) return dispatch(setToast(`הקובץ שנבחר גדול מדי, הגודל המירבי הניתן להעלאה הינו ${Math.ceil(maxFileSize / 1024)}MB`));

  dispatch({ type: SET_FILE, payload: file })
};

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

export const submitMessage = body => async (dispatch, getState) => {
  const { chat: { file } } = getState();
  socket.emit('client:newMessage', { body, file });
  dispatch({ type: SET_FILE, payload: null })
};

export const resetChatState = () => ({
  type: RESET_CHAT_STATE
});

export const fetchPreviousMessages = (chatId, messageId) => async (
  dispatch,
  getState
) => {
  try {
    const {
      chat: { isFetchingPreviousMessages, isMorePreviousMessages }
    } = getState();
    if (!isFetchingPreviousMessages && isMorePreviousMessages) {
      dispatch({ type: SET_IS_FETCHING_PREVIOUS_MESSAGES });
      dispatch(httpRequestInProgress(true));
      const PreviousMessages = await axios.get(`${process.env.REACT_APP_BASE_URL}/chat/${chatId}/${messageId}`);
      if (PreviousMessages.data.length) {
        dispatch({
          type: UNSHIFT_PREVIOUS_MESSAGES,
          payload: PreviousMessages.data
        });
        dispatch({ type: SET_IS_FETCHING_PREVIOUS_MESSAGES });
      } else {
        dispatch({ type: SET_IS_MORE_PREVIOUS_MESSAGES, payload: false });
        dispatch({ type: SET_IS_FETCHING_PREVIOUS_MESSAGES });
      }
      dispatch(httpRequestInProgress(false));
    }
  } catch (ex) {
    console.log(ex);
  }
};

export const setCreateRoomModalState = bool => ({
  type: SET_CREATE_ROOM_MODAL_STATE,
  payload: bool
});

let fetchUserSuggestionsTimeout = null;
export const fetchUserSuggestions = displayName => dispatch => {
  clearTimeout(fetchUserSuggestionsTimeout);
  fetchUserSuggestionsTimeout = setTimeout(() => {
    if (displayName.trim().length) {
      dispatch({
        type: FETCH_USER_SUGGESTIONS,
        payload: axios.get(`${process.env.REACT_APP_BASE_URL}/users?displayName=${displayName}&limit=5`)
      });
    }
  }, 400)
}

export const setUserSuggestor = boolean => ({
  type: SET_USER_SUGGESTOR,
  payload: boolean
});