const roles = {
  Admin: {
    id: 'admin',
    description: 'דרגה זו אינה מוגבלת בגישות',
    categories: {
      chatRoom: {
        permissions: [
          'createPublicChat',
          'createPrivateChat',
          'viewChat',
          'addComment',
          'editChat',
          'removeChat',
          'editComment',
          'removeComment'
        ]
      },
      user: {
        permissions: ['createUser', 'editUser', 'removeUser']
      }
    }
  },

  Moderator: {
    id: 'moderator',
    description: `דרגה זו מאפשרת מחיקה ועריכה של הודעות בחדרי הצ'אט`,
    categories: {
      chatRoom: {
        permissions: [
          'createPrivateChat',
          'viewChat',
          'addComment',
          'editComment',
          'removeComment'
        ]
      },
      user: {
        permissions: ['editUser']
      }
    }
  },

  User: {
    id: 'user',
    description: `דרגה זו מאפשרת גישות בסיסיות כגון צפייה בחדרים והוספת תגובות`,
    categories: {
      chatRoom: {
        permissions: ['createPrivateChat', 'addComment']
      }
    }
  }
};

const isAllowed = (role, category, action) => {
  if (!roles[role]) throw new Error(`${role} Is Not Defined In Roles`);
  if (!roles[role].categories[category]) return false;
  return roles[role].categories[category].permissions.includes(action);
};

export { isAllowed };
