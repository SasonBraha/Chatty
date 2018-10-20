import {
  FETCH_CURRENT_ROOM,
  FETCH_ROOMS,
  NEW_MESSAGE,
  UPDATE_ACTIVE_USERS,
  ADD_TYPING_USER,
  REMOVE_TYPING_USER,
  SET_IMAGE_PREVIEW,
  SET_IS_TYPING,
  SET_IS_FETCHING_PREVIOUS_MESSAGES,
  SET_IS_MORE_PREVIOUS_MESSAGES,
  UNSHIFT_PREVIOUS_MESSAGES,
  SET_CREATE_ROOM_MODAL_STATE,
  FETCH_USER_SUGGESTIONS
} from '../constants';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = {
  chatRooms: [],
  typingUsers: [],
  activeUsers: [],
  messages: [],
  isTyping: false,
  image: null,
  currentChatRoom: {},
  urlSlug: '',
  suggestedUsers: [],
  isCreateChatRoomModalOpen: false,
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
            chatRooms: 
            state.chatRooms, 
            urlSlug: urlSlugFromRouter || '' 
          };

    case FETCH_ROOMS:
      return {
        ...state,
        chatRooms: action.payload.data.reduce(
          (acc, chatRoom) => Object.assign(acc, { [chatRoom.slug]: chatRoom }),
          {}
        )
      };

    case FETCH_CURRENT_ROOM:
      return {
        ...state,
        currentChatRoom: {
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

    case SET_IMAGE_PREVIEW:
      return {
        ...state,
        image: action.payload
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

    case SET_CREATE_ROOM_MODAL_STATE:
      return {
        ...state,
        isCreateChatRoomModalOpen: action.payload
      };

    case FETCH_USER_SUGGESTIONS: 
      return {
        ...state,
        suggestedUsers: action.payload.data
      }

    default:
      return state;
  }
};
