import {
  FETCH_CURRENT_ROOM,
  FETCH_ROOMS,
  NEW_MESSAGE,
  UPDATE_ACTIVE_USERS,
  ADD_TYPING_USER,
  REMOVE_TYPING_USER,
  SET_FILE,
  SET_IS_TYPING,
  SET_IS_FETCHING_PREVIOUS_MESSAGES,
  SET_IS_MORE_PREVIOUS_MESSAGES,
  UNSHIFT_PREVIOUS_MESSAGES,
  SET_CREATE_ROOM_MODAL,
  FETCH_USER_SUGGESTIONS,
  SET_USER_SUGGESTOR,
  RESET_MODALS
} from '../constants';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  chatRooms: [],
  typingUsers: [],
  activeUsers: [],
  messages: [],
  isTyping: false,
  file: null,
  currentChat: {},
  isFetched: false,
  urlSlug: '',
  suggestedUsers: [],
  showUserSuggestor: false,
  showCreateRoomModal: true,
  isFetchingPreviousMessages: false,
  isMorePreviousMessages: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_CHANGE:
      const urlSlugFromRouter = action.payload.pathname.split('/')[2];
      return urlSlugFromRouter === state.urlSlug
        ? { ...state }
        : { 
            ...initialState, 
            chatRooms: state.chatRooms, 
            urlSlug: urlSlugFromRouter || '' 
          };

    case FETCH_ROOMS:
      return {
        ...state,
        chatRooms: action.payload.data.reduce((acc, chatRoom) => Object.assign(acc, { [chatRoom.slug]: chatRoom }), {})
      };

    case FETCH_CURRENT_ROOM:
      return {
        ...state,
        isFetched: true,
        currentChat: {
          ...action.payload
        },
        messages: [...action.payload.messages]
      };

    case NEW_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };

    case UPDATE_ACTIVE_USERS:
      return {
        ...state,
        activeUsers: action.payload
      };

    case ADD_TYPING_USER:
      return {
        ...state,
        typingUsers: [...state.typingUsers, action.payload]
      };

    case REMOVE_TYPING_USER:
      return {
        ...state,
        typingUsers: state.typingUsers.filter(
          displayName => displayName !== action.payload
        )
      };

    case SET_FILE:
      return {
        ...state,
        file: action.payload
      };

    case SET_IS_TYPING:
      return {
        ...state,
        isTyping: action.payload
      };

    case SET_IS_FETCHING_PREVIOUS_MESSAGES:
      return {
        ...state,
        isFetchingPreviousMessages: !state.isFetchingPreviousMessages
      };

    case SET_IS_MORE_PREVIOUS_MESSAGES:
      return {
        ...state,
        isMorePreviousMessages: action.payload
      };

    case UNSHIFT_PREVIOUS_MESSAGES:
      return {
        ...state,
        messages: [...action.payload, ...state.messages]
      };

    case SET_CREATE_ROOM_MODAL:
      return {
        ...state,
        showCreateRoomModal: true
      };

    case FETCH_USER_SUGGESTIONS: 
      return {
        ...state,
        suggestedUsers: action.payload.data
      }

    case SET_USER_SUGGESTOR:
      return {
        ...state,
        showUserSuggestor: action.payload
      }

    case RESET_MODALS: 
      return {
        ...state,
        showCreateRoomModal: false
      }

    default:
      return state;
  }
};
