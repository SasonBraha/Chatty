import { LOCATION_CHANGE } from 'react-router-redux';
import { 
  SET_NAV_STATE,
  SET_HEADER_DROPDOWN,
  SET_FORM_ERRORS,
  UPDATE_APP_BRAND,
  SET_TOAST,
  REMOVE_TOAST,
  HTTP_REQUEST_IN_PROGRESS,
  RESET_DROPDOWN, 
  FETCH_UNSEEN_NOTIFICATIONS_COUNT,
  SET_NOTIFICATIONS_DROPDOWN,
  FETCH_NOTIFICATIONS
 } from '../constants'; 

const initialState = {
  nav: {
    isNavOpen: window.innerWidth > 992,
    navItems: {
      guestNavItems: [
        { icon: 'fas fa-sign-in-alt', to: '/signup', body: 'הרשמה' },
        { icon: 'far fa-user-circle', to: '/signin', body: 'התחברות' }
      ],
      authenticatedNavItems: [
        { icon: 'fas fa-comment', to: '/chat', body: "צ'אט" }
      ],
      adminNavItems: [
        { icon: 'fas fa-cog', to: '/admin', body: 'ניהול האתר' }
      ]
    }
  }, 
  header: {
    brand: 'Chatty',
    isHeaderDropdownOpen: false,
    isAuthActionsOpen: true
  },
  form: {
    errors: {}
  },
  toasts: [], 
  httpRequestInProgress: false,
  isOverlayOpen: false,
  notifications: {
    unseenCount: 0,
    isNotificationsDropdownOpen: false,
    items: []
  }
}

export default (state = initialState, action) => {
  switch(action.type) {
    case LOCATION_CHANGE:
      return { 
        ...initialState,
        nav: {
          ...state.nav,
          isNavOpen: state.nav.isNavOpen
        },
        notifications: {
          ...state.notifications,
          isNotificationsDropdownOpen: false
        }
      }

    case RESET_DROPDOWN:
      return {
        ...state,
        header: {
          ...state.header,
          isHeaderDropdownOpen: false
        },
        notifications: {
          ...state.notifications,
          isNotificationsDropdownOpen: false
        }
      }

    case SET_NAV_STATE:
      return {
        ...state,
        nav: {
          ...state.nav,
          isNavOpen: !state.nav.isNavOpen
        }
      }

    case SET_HEADER_DROPDOWN:
      return {
        ...state, 
        header: {
          ...state.header,
          isHeaderDropdownOpen: !state.header.isHeaderDropdownOpen
        }
      }

    case UPDATE_APP_BRAND: 
      return {
        ...state,
        header: {
          ...state.header,
          brand: action.payload
        }
      }

    case HTTP_REQUEST_IN_PROGRESS:
      return {
        ...state,
        httpRequestInProgress: action.payload
      }

    case SET_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, action.payload]
      }

    case REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(({ id }) => parseInt(id) !== parseInt(action.payload))
      }

    case SET_FORM_ERRORS:
      return {
        ...state,
        form: {
          ...state.form,
          errors: action.payload
        }
      }

    case FETCH_UNSEEN_NOTIFICATIONS_COUNT:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          unseenCount: action.payload.data
        }
      } 

    case SET_NOTIFICATIONS_DROPDOWN:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          isNotificationsDropdownOpen: !state.notifications.isNotificationsDropdownOpen
        }
      }

    case FETCH_NOTIFICATIONS:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          items: action.payload.data
        }
      }
    
    default: return state;
  }
}

