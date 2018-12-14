//------------------------------------//
//  Global                            //
//------------------------------------//
const globalPrefix = '@global';
export const UPDATE_APP_BRAND = `${globalPrefix}/UPDATE_APP_BRAND`;
export const SET_NAV_STATE = `${globalPrefix}/SET_NAV_STATE`;
export const RESET_DROPDOWN = `${globalPrefix}/RESET_DROPDOWN`;
export const SET_HEADER_DROPDOWN = `${globalPrefix}/SET_HEADER_DROPDOWN`;
export const HTTP_REQUEST_IN_PROGRESS = `${globalPrefix}/HTTP_REQUEST_IN_PROGRESS`;
export const SET_TOAST = `${globalPrefix}/SET_TOAST`;
export const REMOVE_TOAST = `${globalPrefix}/REMOVE_TOAST`;

//------------------------------------//
//  Auth                              //
//------------------------------------//
const authPrefix = '@auth';
export const REGISTER_USER = `${authPrefix}/REGISTER_USER`;
export const LOGIN_USER = `${authPrefix}/LOGIN_USER`;
export const SET_USER_CREDENTIALS = `${authPrefix}/SET_USER_CREDENTIALS`;
export const REMOVE_USER_CREDENTIALS = `${authPrefix}/REMOVE_USER_CREDENTIALS`;
export const SET_FORM_ERRORS = `${authPrefix}/SET_FORM_ERRORS`;
export const REQUIRE_LOGIN = `${authPrefix}/REQUIRE_LOGIN`;

//------------------------------------//
//  User                              //
//------------------------------------//
const userPrefix = '@user';
export const FETCH_USER_PROFILE = `${userPrefix}/FETCH_USER_PROFILE`;
export const FETCH_UNSEEN_NOTIFICATIONS_COUNT = `${userPrefix}/FETCH_UNSEEN_NOTIFICATIONS_COUNT`;
export const SET_NOTIFICATIONS_DROPDOWN = `${userPrefix}/SET_NOTIFICATIONS_DROPDOWN`;
export const FETCH_NOTIFICATIONS = `${userPrefix}/FETCH_NOTIFICATIONS`;

//------------------------------------//
//  Chat                              //
//------------------------------------//
const chatPrefix = '@chat';
export const FETCH_ROOMS = `${chatPrefix}/FETCH_ROOMS`;
export const SET_CREATE_ROOM_MODAL_STATE = `${chatPrefix}/SET_CREATE_ROOM_MODAL_STATE`;
export const FETCH_CURRENT_ROOM = `${chatPrefix}/FETCH_CURRENT_ROOM`;
export const NEW_MESSAGE = `${chatPrefix}/NEW_MESSAGE`;
export const UPDATE_ACTIVE_USERS = `${chatPrefix}/UPDATE_ACTIVE_USERS`;
export const ADD_TYPING_USER = `${chatPrefix}/ADD_TYPING_USER`;
export const REMOVE_TYPING_USER = `${chatPrefix}/REMOVE_TYPING_USER`;
export const SET_IS_TYPING = `${chatPrefix}/SET_IS_TYPING`;
export const SET_FILE = `${chatPrefix}/SET_FILE`;
export const SUBMIT_MESSAGE = `${chatPrefix}/SUBMIT_MESSAGE`;
export const RESET_CHAT_STATE = `${chatPrefix}/RESET_CHAT_STATE`;
export const FETCH_PREVIOUS_MESSAGES = `${chatPrefix}/FETCH_PREVIOUS_MESSAGES`;
export const SET_IS_FETCHING_PREVIOUS_MESSAGES = `${chatPrefix}/SET_IS_FETCHING_PREVIOUS_MESSAGES`;
export const SET_IS_MORE_PREVIOUS_MESSAGES = `${chatPrefix}/SET_IS_MORE_PREVIOUS_MESSAGES`;
export const UNSHIFT_PREVIOUS_MESSAGES = `${chatPrefix}/UNSHIFT_PREVIOUS_MESSAGES`;
export const FETCH_USER_SUGGESTIONS = `${chatPrefix}/FETCH_USER_SUGGESTIONS`;
export const SET_USER_SUGGESTOR = `${chatPrefix}/SET_USER_SUGGESTOR`;
