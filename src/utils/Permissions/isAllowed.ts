import {
  ADMIN_ROLE,
  MODERATOR_ROLE,
  USER_ROLE,

  CREATE_CHAT_ACTION,
  VIEW_CHAT_ACTION,
  EDIT_CHAT_ACTION,
  REMOVE_CHAT_ACTION,
  POST_MESSAGE_ACTION,
  EDIT_MESSAGE_ACTION,
  REMOVE_MESSAGE_ACTION,

  EDIT_USER_ACTION,
  REMOVE_USER_ACTION
} from './permissionsConstants';


const roles = {
  [ADMIN_ROLE]: {
    categories: {
      chatRoom: {
        permissions: [
          CREATE_CHAT_ACTION,
          VIEW_CHAT_ACTION,
          EDIT_CHAT_ACTION,
          REMOVE_CHAT_ACTION,
          POST_MESSAGE_ACTION,
          EDIT_MESSAGE_ACTION,
          REMOVE_MESSAGE_ACTION
        ]
      },
      user: {
        permissions: [EDIT_USER_ACTION, REMOVE_USER_ACTION]
      }
    }
  },

  [MODERATOR_ROLE]: {
    categories: {
      chatRoom: {
        permissions: [
          CREATE_CHAT_ACTION,
          VIEW_CHAT_ACTION,
          POST_MESSAGE_ACTION,
          REMOVE_MESSAGE_ACTION
        ]
      },
      user: {
        permissions: [EDIT_USER_ACTION]
      }
    }
  },

  [USER_ROLE]: {
    categories: {
      chatRoom: {
        permissions: [CREATE_CHAT_ACTION, POST_MESSAGE_ACTION]
      },
      user: {
        permissions: []
      }
    }
  }
};

const isAllowed = (role, category, action) => roles[role].categories[category].permissions.includes(action);

export default isAllowed;
