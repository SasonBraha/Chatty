//------------------------------------//
//  Root                              //
//------------------------------------//
export const UPDATE_APP_BRAND = '@root/UPDATE_APP_BRAND';
export const SET_NAV_STATE = '@root/SET_NAV_STATE';
export const RESET_DROPDOWN = '@root/RESET_DROPDOWN';
export const SET_HEADER_DROPDOWN = '@root/SET_HEADER_DROPDOWN';
export const HTTP_REQUEST_IN_PROGRESS = '@root/HTTP_REQUEST_IN_PROGRESS';
export const SET_TOAST = '@root/SET_TOAST';
export const REMOVE_TOAST = '@root/REMOVE_TOAST';

//------------------------------------//
//  Auth                              //
//------------------------------------//
export const REGISTER_USER = '@auth/REGISTER_USER';
export const LOGIN_USER = '@auth/LOGIN_USER';
export const SET_USER_CREDENTIALS = '@auth/SET_USER_CREDENTIALS';
export const REMOVE_USER_CREDENTIALS = '@auth/REMOVE_USER_CREDENTIALS';
export const SET_FORM_ERRORS = '@auth/SET_FORM_ERRORS';
export const REQUIRE_LOGIN = '@auth/REQUIRE_LOGIN';

//------------------------------------//
//  User                              //
//------------------------------------//
export const FETCH_USER_PROFILE = '@user/FETCH_USER_PROFILE';
export const FETCH_UNSEEN_NOTIFICATIONS_COUNT = '@user/FETCH_UNSEEN_NOTIFICATIONS_COUNT';
export const SET_NOTIFICATIONS_DROPDOWN = '@user/SET_NOTIFICATIONS_DROPDOWN';
export const FETCH_NOTIFICATIONS = '@user/FETCH_NOTIFICATIONS';

//------------------------------------//
//  Chat                              //
//------------------------------------//
export const FETCH_ROOMS = '@chat/FETCH_ROOMS';
export const SET_CREATE_ROOM_MODAL_STATE = '@chat/SET_CREATE_ROOM_MODAL_STATE';
export const FETCH_CURRENT_ROOM = '@chat/FETCH_CURRENT_ROOM';
export const NEW_MESSAGE = '@chat/NEW_MESSAGE';
export const UPDATE_ACTIVE_USERS = '@chat/UPDATE_ACTIVE_USERS';
export const ADD_TYPING_USER = '@chat/ADD_TYPING_USER';
export const REMOVE_TYPING_USER = '@chat/REMOVE_TYPING_USER';
export const SET_IS_TYPING = '@chat/SET_IS_TYPING';
export const SET_FILE = '@chat/SET_FILE';
export const SUBMIT_MESSAGE = '@chat/SUBMIT_MESSAGE';
export const RESET_CHAT_STATE = '@chat/RESET_CHAT_STATE';
export const FETCH_PREVIOUS_MESSAGES = '@chat/FETCH_PREVIOUS_MESSAGES';
export const SET_IS_FETCHING_PREVIOUS_MESSAGES = '@chat/SET_IS_FETCHING_PREVIOUS_MESSAGES';
export const SET_IS_MORE_PREVIOUS_MESSAGES = '@chat/SET_IS_MORE_PREVIOUS_MESSAGES';
export const UNSHIFT_PREVIOUS_MESSAGES = '@chat/UNSHIFT_PREVIOUS_MESSAGES';
export const FETCH_USER_SUGGESTIONS = '@chat/FETCH_USER_SUGGESTIONS';
