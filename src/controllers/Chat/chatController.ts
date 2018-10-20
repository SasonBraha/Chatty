import Store from './Store';
import { Chat } from '../../models';
import { IUser } from '../../models/User';
import { toBase64String } from '../../utils';
import { putObject } from '../../config/s3/s3.methods'; 

const store = new Store();

export default async (io, socket, userData) => {
  let currentChatRoom = null;
  socket
    // Handle Join Room
    .on('client:joinChatRoom', async slug => {
      currentChatRoom = await Chat.findOne(
        {
          $or: [
            { slug, status: 'public' },
            {
              slug,
              status: 'private',
              allowedUsers: userData._id
            }
          ]
        },
        { messages: { $slice: 0 } }
      ).select('+messages');
      if (!currentChatRoom) return;
      store.addUser(slug, userData, updatedUserList => {
        socket
          .join(slug)
          .broadcast.to(slug)
          .emit('server:newUserJoined', userData);

        io.to(slug).emit('server:updateUserList', updatedUserList);
      });
    })

    // Handle Leave Room
    .on('client:leaveChatRoom', async () => {
      if (currentChatRoom) {
        const { slug } = currentChatRoom;
        store.removeUser(slug, userData, updatedUserList => {
          socket.leave(slug);
          socket.broadcast
            .to(slug)
            .emit('server:updateUserList', updatedUserList);
          currentChatRoom = null;
        });
      }
    })

    // Handle New Message
    .on('client:newMessage', async ({ body, image }, cb) => {
      if (!body.length) return;
      // Check For Permission To Emit Message
      if (currentChatRoom) {
        io.to(currentChatRoom.slug).emit('server:newMessage', {
          createdBy: userData,
          body,
          image: toBase64String(image)
        });
        typeof cb === 'function' && cb();

        // Store Message In DB
        if (currentChatRoom && currentChatRoom.storeMessages) {
          currentChatRoom.messages.push({
            body,
            createdBy: {
              _id: userData._id,
              displayName: userData.displayName,
              slug: userData.slug,
              avatar: userData.avatar
            }, 
            image: image ? await putObject(image, currentChatRoom.slug) : null
          });
          currentChatRoom.lastMessage = `${body}`;
          await currentChatRoom.save();
        }
      }
    })

    // Handle Typing
    .on('client:userIsTyping', () => {
      socket.broadcast
        .to(currentChatRoom.slug)
        .emit('server:userIsTyping', userData.displayName);
    })
    .on('client:userStoppedTyping', () => {
      socket.broadcast
        .to(currentChatRoom.slug)
        .emit('server:userStoppedTyping', userData.displayName);
    });
};
